import React, { Component } from 'react';
import './intro.style.css';
import pubsub from 'pubsub-js';
import Button from './button.component';

export default class SectionSelect extends Component {
    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
    }

    select() {
        pubsub.publish('navigate', {
            screen: 'creator',
        });
    }

    render() {
        return (
            <div className="add-section-buttons-container">
                {/*<Button onClick={this.select} className="select-btn">select</Button>*/}
                {/*<button id="demo-menu-lower-left"*/}
                        {/*className="mdl-button mdl-js-button mdl-button--icon">*/}
                    {/*<i className="material-icons">more_vert</i>*/}
                {/*</button>*/}

                {/*<ul className="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect"*/}
                    {/*htmlFor="demo-menu-lower-left">*/}
                    {/*<li className="mdl-menu__item">Some Action</li>*/}
                    {/*<li className="mdl-menu__item mdl-menu__item--full-bleed-divider">Another Action</li>*/}
                    {/*<li disabled className="mdl-menu__item">Disabled Action</li>*/}
                    {/*<li className="mdl-menu__item">Yet Another Action</li>*/}
                {/*</ul>*/}

                <button id="demo-menu-lower-right"
                        className="mdl-button mdl-js-button mdl-button--icon">
                    <i className="material-icons">more_vert</i>
                </button>

                <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                    htmlFor="demo-menu-lower-right">
                    <li className="mdl-menu__item">Some Action</li>
                    <li className="mdl-menu__item">Another Action</li>
                    <li disabled className="mdl-menu__item">Disabled Action</li>
                    <li className="mdl-menu__item">Yet Another Action</li>
                </ul>
            </div>
        );
    }
}
