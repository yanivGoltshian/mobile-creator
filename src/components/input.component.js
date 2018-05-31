import React, { Component } from 'react';

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onChange = this.onChange.bind(this);
    }

    getDerivedStateFromProps(nextProps) {
        return { value: nextProps.value };
    }

    onChange(evt) {
        const value = evt.target.value;
        const { onChange } = this.props;
        this.setState({ value });
        onChange && onChange(value);
    }

    render() {
        const { placeholder, inputId } = this.props;

        return (
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input" type="text" id="{inputId}" value={this.state.value} onChange={this.onChange} />
                <label className="mdl-textfield__label" for="{inputId}">{placeholder}</label>
            </div>
        );
    }
}