import React, { Component } from 'react';
import cn from 'classnames';
import './intro.style.css';

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { onClick } = this.props;
        onClick && onClick();
    }

    render() {
        const { type } = this.props;

        const btnClass = ["mdl-button mdl-js-button mdl-js-ripple-effect", this.props.className];

        if (type === 'fab') {
            btnClass.push(
                'mdl-button--fab',
                'mdl-button--colored',
            );
        } else {
            btnClass.push(
                'mdl-button--raised',
                'mdl-button--accent',
            );
        }

        return (
            <button className={cn(btnClass)} onClick={this.onClick}>
                {this.props.children}
            </button>
        );
    }
}
