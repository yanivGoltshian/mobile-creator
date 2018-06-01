import React, { Component } from 'react';
import Button from './button.component';
import pubsub from 'pubsub-js';
import './section-select.style.scss';
import 'pb-svg-icons/svg/formats/format-flip-cards-sm.svg';
import 'pb-svg-icons/svg/formats/format-shorts-md.svg';
import 'pb-svg-icons/svg/formats/format-list-md.svg';
import 'pb-svg-icons/svg/formats/format-abstract-md.svg';
import 'pb-svg-icons/svg/formats/format-personality-quiz-md.svg';
import 'pb-svg-icons/svg/formats/format-trivia-md.svg';
import 'pb-svg-icons/svg/formats/format-convo-md.svg';
import 'pb-svg-icons/svg/core/image.svg';
import { uploadAssets } from '../services/image-upload.service';

let idCounter = 1;

export default class SectionSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideSelection: true,
            icons: [
                'image',
                'format-convo-md',
                'format-trivia-md',
                'format-personality-quiz-md',
                'format-abstract-md',
                'format-list-md',
                'format-shorts-md',
                'format-flip-cards-sm',
            ]
        };
        this.openSelection = this.openSelection.bind(this);
        this.selectSelection = this.selectSelection.bind(this);
        this.renderSections = this.renderSections.bind(this);
    }

    openSelection() {
        this.setState({
            hideSelection: !this.state.hideSelection
        });
    }

    selectSelection(e) {
        this.setState({
            hideSelection: true
        });

        pubsub.publish('section_media_uploading');

        uploadAssets().then(urls => {
            const sections = urls.map(url => ({
                type: 'image',
                id: idCounter++,
                url,
            }));
            pubsub.publish('sections_added', { sections });
        });
    }

    renderSections() {
        const { icons } = this.state;

        let particals = icons.map((icon) => (
            <button key={icon}
                type="button"
                className='section-btn'
                onClick={this.selectSelection}>
                <svg className='section-icon'>
                    <use xlinkHref={'#pb-icon-' + icon} />
                </svg>
            </button>
        ));

        return particals;
    }

    render() {
        return (
            <div className="add-section-buttons-container">
                <div className={this.state.hideSelection ? 'buttons-container hide-container' : 'buttons-container'}>
                    {this.renderSections()}
                </div>
                <Button className="plus-btn" type="fab" onClick={this.openSelection}>
                    <i className="material-icons">add</i>
                </Button>
            </div>
        );
    }
}
