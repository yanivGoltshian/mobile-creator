import React, { Component } from 'react';
import './intro.style.css';
import pubsub from 'pubsub-js';
import Button from './button.component';
import Input from './input.component';

export default class Intro extends Component {
    constructor(props) {
        super(props);
        this.create = this.create.bind(this);
    }

    create() {
        pubsub.publish('navigate', {
            screen: 'creator',
        });
    }

    render() {
        return (
            <div className="intro">
                <div className="text1" >Your Story</div>
                <div className="text2" >In The Palm of Your Hand</div>
                <Input placeholder="Story title" inputId="story-title"/>
                <Button onClick={this.create} className="create-btn">Create</Button>
                <img className="logo" src="https://img.playbuzz.com/image/upload/c_crop/v1527775229/hngdn8hywxcvnrhi9xix.png"></img>
            </div>
        );
    }
}
