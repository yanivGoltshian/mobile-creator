import React from 'react';
import './navbar.style.scss';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="creator-header">
                <span className="header-title">Story Create</span>
                <div className="header-icons">
                    <ul className="header-icons-list">
                        <li>
                            <button className="btn mdl-button mdl-js-button" onClick={this.props.onSave}>
                                <i className="btn-icon material-icons">save</i>
                            </button>
                        </li>
                        <li>
                            <button className="btn mdl-button mdl-js-button" onClick={this.props.onPublish}>
                                <i className="btn-icon material-icons">publish</i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
