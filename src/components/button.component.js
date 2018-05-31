import React, { Component } from 'react';

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {onClick} = this.props.onClick;
        return (
            <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={onClick}>
                {this.props.children}
            </button>
        );
    }
}
