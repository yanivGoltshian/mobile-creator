import axios from 'axios';

const CreatorService = {
    save(item) {
        return new Promise((resolve, reject) => {
            return axios({
                method: 'POST',
                url: 'https://stg-video-creator.playbuzz.com/no-login/create-mobile',
                data: item
            }).then(response => window.location.replace(response.data.url))
                .catch((err) => console.error(err));
        });
    }
};

export default CreatorService;
