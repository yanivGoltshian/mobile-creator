import React, { Component } from 'react';
import './intro.style.css';

import Button from './button.component';
import Input from './input.component';

export default class Intro extends Component {
    render() {
        return (
            <div className="intro">
                <Input placeholder="Title" inputId="story-title"/>
                <Button>Create</Button>
            </div>
        );
    }
}
