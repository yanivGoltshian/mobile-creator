import React, { Component } from 'react';

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" {...this.props}>
                {this.props.children}
            </button>
        );
    }
}