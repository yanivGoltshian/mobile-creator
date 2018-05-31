import React, { Component } from 'react';
import './image-section.style.scss';

export default class ImageSection extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { section } = this.props;

        return (
            <div className="image-section">
                <img className="image" src={section.url} />
            </div>
        );
    }
}