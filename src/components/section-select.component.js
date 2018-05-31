import React, { Component } from 'react';
import Button from './button.component';
import cn from 'classnames';
import './section-select.style.scss';
import 'pb-svg-icons/svg/formats/format-flip-cards-sm.svg';
import 'pb-svg-icons/svg/formats/format-shorts-md.svg';
import 'pb-svg-icons/svg/formats/format-list-md.svg';
import 'pb-svg-icons/svg/formats/format-abstract-md.svg';
import 'pb-svg-icons/svg/formats/format-personality-quiz-md.svg';
import 'pb-svg-icons/svg/formats/format-trivia-md.svg';
import 'pb-svg-icons/svg/formats/format-convo-md.svg';
import 'pb-svg-icons/svg/core/image.svg';


export default class SectionSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideSelection: true,
            icons: ['image', 'format-convo-md', 'format-trivia-md', 'format-personality-quiz-md', 'format-abstract-md', 'format-list-md', 'format-shorts-md', 'format-flip-cards-sm']
        };
        this.openSelection = this.openSelection.bind(this);
        this.selectSelection = this.selectSelection.bind(this);
        this.readIcon = this.readIcon.bind(this);
    }

    openSelection() {
        this.setState({
            hideSelection: !this.state.hideSelection
        }
        );
    }

    selectSelection(e) {
        this.setState({
            hideSelection: true
        });
    }

    readIcon() {
        let particals = [];
        this.state.icons.forEach((icon, index) => {
            particals.push(
                <button key={index}
                    type="button"
                    className='section-btn'
                    onClick={this.selectSelection}>
                    <svg className='section-icon'>
                        <use xlinkHref={'#pb-icon-' + icon} />
                    </svg>
                </button>)
        });
        return particals;
    }

    render() {
        return (
            <div className="add-section-buttons-container">
                <div className={this.state.hideSelection ? 'buttons-container hide-container' : 'buttons-container'}>
                    {this.readIcon()}
                </div>
                <Button className="plus-btn" type="fab" onClick={this.openSelection}>
                    <i className="material-icons">add</i>
                </Button>
            </div>
        );
    }
}
