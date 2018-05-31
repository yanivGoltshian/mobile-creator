import React, { Component } from 'react';
import './Intro.scss';

import Button from './button.component';
import Input from './input.component';

export default class Intro extends Component {
    render() {
        return (
            <div className="Intro">
                <Input placeholder="Title" inputId="story-title"/>
                <Button>Create</Button>
            </div>
        );
    }
}
