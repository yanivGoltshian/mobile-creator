import React, { Component } from 'react';
import Button from './button.component';
import './creator-screen.style.scss';
import SectionSelect from "./section-select.component";
import Navbar from "./navbar/navbar.component";

export default class CreatorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                <SectionSelect></SectionSelect>
            </div>
        );
    }
}
