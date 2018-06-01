import { getLinksArray } from './image-upload.service'
import generateGuid from 'pb-client-modules/src/guid-generator';

const ItemService = {
    urls: [],
    storyTitle: 'my story',

    setUrls(urlArray) {
        this.urls = urlArray;
    },

    setStoryTitle(title) {
        this.storyTitle = title;
    },

    getItemJson() {
        return {
            "id": generateGuid() || "0a9ee147-da14-46ff-bb97-c0e598029f2d",
            "tags": [],
            "thumbnail": {
                "mediaType": "image",
                "originalImageUrl": "https://img.playbuzz.com/image/upload/v1485701643/rrptnddw80syrlipfm4r.jpg",
                "width": 1297,
                "height": 688,
                "isAnimated": false,
                "url": "https://img.playbuzz.com/image/upload/c_crop,h_688,w_1297,x_15,y_0/ar_420:315,c_crop/c_fill,w_420/v1485701643/rrptnddw80syrlipfm4r.jpg",
                "selected": {
                    "x": 15,
                    "y": 0,
                    "x2": 1312,
                    "y2": 688,
                    "w": 1297,
                    "h": 688
                }
            },
            "socialThumbnail": {
                "mediaType": "image",
                "originalImageUrl": "https://img.playbuzz.com/image/upload/v1485701643/rrptnddw80syrlipfm4r.jpg",
                "width": 1297,
                "height": 688,
                "isAnimated": false,
                "url": "https://img.playbuzz.com/image/upload/c_crop,h_688,w_1297,x_15,y_0/ar_420:221,c_crop/c_fill,w_420/v1485701643/rrptnddw80syrlipfm4r.jpg",
                "selected": {
                    "x": 15,
                    "y": 0,
                    "x2": 1312,
                    "y2": 688,
                    "w": 1297,
                    "h": 688
                }
            },
            "locale": "en-US",
            "status": "published",
            "translation": {
                "enabled": true
            },
            "sponsored": {
                "enabled": false
            },
            "permission": {
                "view": "public"
            },
            "formatId": "story",
            "sections": [this.getSections()],
            "cover": {
                "mediaType": "image",
                "originalImageUrl": "https://img.playbuzz.com/image/upload/v1485701643/rrptnddw80syrlipfm4r.jpg",
                "width": 1297,
                "height": 688,
                "isAnimated": false,
                "url": "https://img.playbuzz.com/image/upload/c_crop,h_688,w_1297,x_15,y_0/v1485701643/rrptnddw80syrlipfm4r.jpg",
                "selected": {
                    "x": 15,
                    "y": 0,
                    "x2": 1312,
                    "y2": 688,
                    "w": 1297,
                    "h": 688
                }
            },
            "readingTime": 4,
            "title": this.getTitle() || "Sample Story",
            "detectedLocale": "en-US",
            "channelId": "2da466c9-d201-45fc-a18d-5687aac968c5"
        };
    },

    getTitle() {
        return this.storyTitle || 'my story';
    },

    getSections() {
        let sections = [];
        const array = this.urls || [];
        array.forEach((link) => {
            sections.push(this.getListSection(link));
        });
        return sections;
    },

    getMediaSection(link) {
        return [{
            "title": {
                "ops": [
                    {
                        "insert": "\n"
                    }
                ]
            },
            "list": {
                "type": "none",
                "backgroundColor": "#009CFF",
                "color": "#fff",
                "enableVoting": true,
                "enableDownVoting": false
            },
            "media": {
                "mediaType": "image",
                "originalImageUrl": link,
                "url": link,
                "canvasObjects": {},
                "width": 1500,
                "height": 1001,
                "isAnimated": false,
                "selected": {
                    "h": 1001,
                    "w": 1500,
                    "x": 0,
                    "y": 0,
                    "x2": 1500,
                    "y2": 1001
                },
                "fileSize": 347449,
                "credits": "Getty Images",
                "gettyAssetId": "908333824",
                "gettyAccount": "Playbuzz"
            },
            "id": generateGuid() || "4ce622cb-c5f9-4b7a-8445-642fc75d42cc",
            "type": "mediaSection",
            "$$hashKey": "object:551",
            "settings": {
                "autoPlay": true
            },
            "description": {
                "ops": [
                    {
                        "insert": "\n"
                    }
                ]
            }
        }]
    },

    getTextSection(text) {
        return [
            {
                "title": {
                    "ops": [
                        {
                            "insert": "\n"
                        }
                    ]
                },
                "text": {
                    "ops": [
                        {
                            "insert": text + "\n"
                        }
                    ]
                },
                "list": {
                    "type": "none",
                    "backgroundColor": "#009CFF",
                    "color": "#fff",
                    "enableVoting": true,
                    "enableDownVoting": false
                },
                "id": generateGuid() || "08bc7218-7078-4183-ac81-88a7b38b2a80",
                "type": "paragraphSection",
                "$$hashKey": "object:1162"
            }
        ]
    },

    getVideoSection(link) {
        return [
            {
                "title": {
                    "ops": [
                        {
                            "insert": "\n"
                        }
                    ]
                },
                "list": {
                    "type": "none",
                    "backgroundColor": "#009CFF",
                    "color": "#fff",
                    "enableVoting": true,
                    "enableDownVoting": false
                },
                "media": {
                    "mediaType": "video",
                    "url": link,
                    "originalVideoUrl": link,
                    "originalDuration": 9.976633,
                    "format": "mp4",
                    "duration": 9.976633,
                    "height": 360,
                    "width": 640,
                    "poster": "https://vid1.playbuzz.com/video/upload/v1527791917/z0znbfafqxb5xi1dhmt4.jpg",
                    "muted": false,
                    "fileSize": 1217867,
                    "gettyAssetId": "898923976",
                    "gettyAccount": "Playbuzz_Videos",
                    "credits": "Getty Images"
                },
                "id": generateGuid() || "26699e8a-079f-456e-8d08-4226f7cf3e81",
                "type": "mediaSection",
                "$$hashKey": "object:1442",
                "settings": {
                    "autoPlay": true
                },
                "description": {
                    "ops": [
                        {
                            "insert": "\n"
                        }
                    ]
                }
            }
        ]
    },

    getListSection(link) {
        return {
            "title": {
                "ops": [
                    {
                        "insert": "\n"
                    }
                ]
            },
            "list": {
                "type": "none",
                "backgroundColor": "#009CFF",
                "color": "#fff",
                "enableVoting": true,
                "enableDownVoting": false
            },
            "media": {
                "mediaType": "image",
                "originalImageUrl": link || "https://img.playbuzz.com/image/upload/v1527794677/sh6d6sgfbafvepcbnddl.jpg",
                "url": link || "https://img.playbuzz.com/image/upload/c_crop/v1527794677/sh6d6sgfbafvepcbnddl.jpg",
                "canvasObjects": {},
                "width": 1500,
                "height": 844,
                "isAnimated": false,
                "selected": {
                    "h": 844,
                    "w": 1500,
                    "x": 0,
                    "y": 0,
                    "x2": 1500,
                    "y2": 844
                },
                "fileSize": 197130
            },
            "id": generateGuid() || "6e76dfdd-068e-4f5a-b055-99e8c1b6647b",
            "type": "mediaSection",
            "settings": {
                "autoPlay": true
            },
            "description": {
                "ops": [
                    {
                        "insert": "\n"
                    }
                ]
            }
        }
    }
}

export default ItemService;
