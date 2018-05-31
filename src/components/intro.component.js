import React, { Component } from 'react';
import './intro.style.css';

import Button from './button.component';
import Input from './input.component';

export default class Intro extends Component {
    render() {
        return (
            <div className="intro">
                <div className="text1" >Your Story</div>
                <div className="text1" >In your</div>
                <div className="text1">HAND</div>
                <Input className="input" placeholder="Title" inputId="story-title"/>
                <Button className="create-btn" >Create</Button>
            </div>
        );
    }
}
