/* global process */
'use strict';

const path = require('path');
const winston = require('winston');
const {
    S3FileManager,
} = require('pb-node-modules');


async function deploy(logger) {
    logger = logger || winston;
    logger.info(`Starting deployment...`);

    // initialize dependencies
    const s3 = new S3FileManager();
    const deploymentPath = `mobile-creator`;
    const bucket = 'pb-format-story-dev';

    // upload to s3
    logger.info('Uploading files to s3...');
    await s3.upload(
        [
            'mobile-creator.js',
            'mobile-creator.css',
        ],
        deploymentPath,
        bucket,
        {
            basePath: path.join(process.cwd(), 'build')
        },
    );
    logger.info('Successfully uploaded files to s3.');
}

// if you run this file with node.js like this:
// node deploy.js
// require.main will be equal to module
if (require.main === module) {
const logger = new winston.Logger({
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'deployment.log', json: false })
        ],
    });

    new Promise((resolve, reject) => {
        try {
            resolve(deploy(logger));
        } catch (err) {
            reject(err);
        }
    }).catch((err) => {
        logger.error(`Failed to deploy`, err);
        process.exit(-1);
    }).then(() => {
        process.exit(0);
    });
}
