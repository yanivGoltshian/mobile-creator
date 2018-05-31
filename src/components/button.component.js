import React, { Component } from 'react';
import cn from 'classnames';

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { type } = this.props;

        const btnClass = ["mdl-button mdl-js-button mdl-js-ripple-effect"];

        if (type === 'fab') {
            btnClass.push(
                'mdl-button--fab',
            );
        } else {
            btnClass.push(
                'mdl-button--raised',
                'mdl-button--accent',
            );
        }

        return (
            <button className={cn(btnClass)} {...this.props}>
                {this.props.children}
            </button>
        );
    }
}