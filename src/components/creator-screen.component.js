import React, { Component } from 'react';
import Button from './button.component';
import './creator-screen.style.scss';
import SectionSelect from "./section-select.component";

export default class CreatorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="creator-screen">
                <SectionSelect></SectionSelect>
            </div>
        );
    }
}
