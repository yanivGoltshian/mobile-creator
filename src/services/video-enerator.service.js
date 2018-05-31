import axios from 'axios';
import { AppConstants } from './AppConstants'

export class GeneratorService {
    constructor() {
        this.generateUrl = AppConstants.API_ENDPOINT;
    }

    generateVideo(videoData) {
        const url = this.generateUrl + '/mobile/generate';
        const requestConfig = {
            videoData: videoData,
        };
        return axios.post(url, requestConfig).toPromise();
    }

    waitForVideoReady(src) {
        return axios.head(src, { responseType: 'arraybuffer' }).toPromise();
    }
}
