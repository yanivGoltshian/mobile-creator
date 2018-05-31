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
                <div className="text1" >In your</div>
                <div className="text1">HAND</div>
                <Input className="input" placeholder="Title" inputId="story-title"/>
                <Button className="create-btn" onClick={this.create}>Create</Button>
            </div>
        );
    }
}
