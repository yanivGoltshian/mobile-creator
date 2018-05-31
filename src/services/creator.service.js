import axios from 'axios';

const CreatorService = {
    save(item) {
        return new Promise((resolve, reject) => {
            return axios({
                method: 'POST',
                url: 'https://localhost.playbuzz.com/PlayBuzz.Game.Service/Item/MobileSave',
                data: item,
                headers: {
                    cookie: 'playbuzz={%22userId%22:%222da466c9-d201-45fc-a18d-5687aac968c5%22%2C%22session%22:%22c7f7aa8af17aaa08707cbac3f5ab17855f799f71|5/31/2018%206:00:39%20PM%22%2C%22nickname%22:%22talkng10%22%2C%22created%22:1527789640078%2C%22userWebsites%22:0%2C%22hasAccounts%22:false%2C%22origin%22:%22GooglePlus%22%2C%22image%22:%22//lh5.googleusercontent.com/-fnoyVGG6vmw/AAAAAAAAAAI/AAAAAAAAAAA/0BwllKydcEo/photo.jpg?sz=50%22%2C%22version%22:3}'
                },
                withCredentials: true
            }).then(response => console.log(response.data))
                .catch((err) => console.error(err));
        });
    }
};

export default CreatorService;
