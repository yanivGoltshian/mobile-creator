import React, { Component } from 'react';
import './creator-screen.style.scss';
import SectionSelect from "./section-select.component";
import pubsub from 'pubsub-js';
import Navbar from "./navbar/navbar.component";
import ItemService from './../services/item.service'

export default class CreatorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            uploading: false,
        };

        pubsub.subscribe('media_uploading', () => {
            this.setState({
                uploading: true,
            });
        });

        pubsub.subscribe('media_uploaded', (event, { urls }) => {
            this.setState(prevState => ({
                images: [...prevState.images, ...urls],
                uploading: false,
            }));
            ItemService.setUrls(urls);
        });

        this.onSave = this.onSave.bind(this);
        this.onPublish = this.onPublish.bind(this);
    }

    onSave() {

    }

    onPublish() {

    }

    render() {
        return (
            <div className="creator-screen">
                <Navbar onSave={this.onSave} onPublish={this.onPublish} />
                {this.state.uploading ? <div id="p2" className="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div> :
                    this.state.images.map(url => <img key={url} src={url} />)}
                <SectionSelect></SectionSelect>
            </div>
        );
    }
}
