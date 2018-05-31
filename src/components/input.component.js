import React, { Component } from 'react';
import ItemService from "../services/item.service";

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onChange = this.onChange.bind(this);
    }

    static getDerivedStateFromProps(nextProps) {
        return { value: nextProps.value };
    }

    onChange(evt) {
        const value = evt.target.value;
        const { onChange } = this.props;
        this.setState({ value });
        ItemService.setStoryTitle(value);
        onChange && onChange(value);
    }

    render() {
        const { placeholder, inputId } = this.props;

        return (
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label input1">
                <input className="mdl-textfield__input" type="text" id="{inputId}" value={this.state.value} onChange={this.onChange} />
                <label className="mdl-textfield__label" htmlFor="{inputId}">{placeholder}</label>
            </div>
        );
    }
}
