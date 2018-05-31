/* global process */
'use strict';

const path = require('path');
const winston = require('winston');
const {
    ConfigurationManager,
    DeploymentsLog,
    S3FileManager,
    gitUtils,
} = require('pb-node-modules');

/**
 * We have many environments for fronend, but only 3 for backend.
 * Each sandbox environment uses staging backend.
 * So, basically it's the following mapping:
 *  - sandbox-*   -> staging
 *  - staging     -> staging
 *  - development -> development
 *  - production  -> production
 */
function getBackendEnv(environment) {
    if (/sandbox/.test(environment)) {
        return 'staging';
    }

    return environment;
}

function getJenkinsBuildEnv() {
    return {
        user: process.env.BUILD_USER,
        branch: process.env.BRANCH_NAME,
    };
}

/**
 * Gets the machine key (hostname) for the specified environment.
 *
 * @param {String} environment
 * @returns {String}
 */
function getMachineKey(environment) {
    if (environment === 'production') {
        return 'DEFAULT';

    } else if (environment === 'staging') {
        return 'Prod-Alpha';
    }

    // Uppercase first letter for all sandbox environments.
    // e.g. sandbox-1 -> Sandbox-1
    return environment.replace(/^([a-zA-Z])/, (input, $1) => input.replace($1, $1.toUpperCase()));
}

/**
 * Deployment consists of 3 phases:
 *   1. upload built files to s3 bucket
 *   2. update configuration in the database
 *   3. update deployments log (version.json file for now)
 * @param {String} environment Environment name to deploy to
 * @param {Logger} logger Instance of winston logger
 */
async function deploy(environment, logger) {
    logger = logger || winston;
    logger.info(`Starting deployment to ${environment}...`);

    // initialize dependencies
    const s3 = new S3FileManager();
    const configManager = new ConfigurationManager(getBackendEnv(environment));
    const deploymentsLog = new DeploymentsLog();

    // initialize parameters
    const gitHash = gitUtils.getGitSha(process.cwd());
    const githubUrl = `https://github.com/playbuzz/story-viewer/commit/${gitHash}`;
    const timestamp = new Date().toISOString().replace(/T|:/g, '-').replace(/\.\d{3}Z/, '');
    const deploymentPath = `${environment}/${gitHash}-${timestamp}`;
    const bucket = 'pb-story';

    // upload to s3
    logger.info('Uploading files to s3...');
    await s3.upload(
        [
            'story-viewer-ssr.js',
            'story-viewer-svg.js',
            'story-viewer.js',
            'story-viewer.css',
        ],
        deploymentPath,
        bucket,
        {
            basePath: path.join(process.cwd(), 'build')
        },
    );
    logger.info('Successfully uploaded files to s3.');

    const machineKey = getMachineKey(environment);

    // update configuration (mssql)
    logger.info('Updating configuration in the database...');
    logger.info(` - machineKey=${machineKey}`);
    logger.info(' - configKey=git.revision.story-viewer');
    logger.info(` - configValue=${deploymentPath}`);
    await configManager.upsert('git.revision.story-viewer', deploymentPath, machineKey);
    logger.info('Successfully updated configuration in the database.');

    // When updating staging, also update QA automation environment.
    if (environment === 'staging') {
        await configManager.upsert('git.revision.story-viewer', deploymentPath, 'QA-PRODUCTION');
    }

    // update deployments log (version.json)
    logger.info('Updating deployments log...');
    await deploymentsLog.logDeployment({
        project: 'story-viewer',
        environment,
        gitHash,
        githubUrl,
        date: new Date(),
        ...getJenkinsBuildEnv(),
    });
    logger.info('Successfully updated deployments log.');
    logger.info(`Successfully deployed to ${environment}.`);
}

// if you run this file with node.js like this:
// node deploy.js
// require.main will be equal to module
if (require.main === module) {
    const yargs = require('yargs');
    const { argv } = yargs
        .example('$0 -e sandbox-1', 'deploy to sandbox-1')
        .alias('e', 'environment')
        .nargs('e', 1)
        .describe('e', 'Environment name')
        .demandOption(['e'])
        .help('h')
        .alias('h', 'help');

    const logger = new winston.Logger({
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'deployment.log', json: false })
        ],
    });

    const { environment } = argv;

    new Promise((resolve, reject) => {
        try {
            resolve(deploy(environment, logger));
        } catch (err) {
            reject(err);
        }
    }).catch((err) => {
        logger.error(`Failed to deploy to ${environment}.\n`, err);
        process.exit(-1);
    }).then(() => {
        process.exit(0);
    });
}
