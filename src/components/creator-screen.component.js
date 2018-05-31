import React, { Component } from 'react';
import Button from './button.component';
import './creator-screen.style.scss';
import SectionSelect from "./section-select.component";
import pubsub from 'pubsub-js';

export default class CreatorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
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
        });
    }

    render() {
        return (
            <div className="creator-screen">
                {this.state.uploading ? <div id="p2" className="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div> :
                    this.state.images.map(url => <img key={url} src={url} />)}
                <SectionSelect></SectionSelect>
            </div>
        );
    }
}
