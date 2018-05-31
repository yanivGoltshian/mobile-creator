import React from 'react';
import './navbar.style.scss';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="creator-header">
                <div className="header-logo" />
                <div className="header-icons">
                    <ul className="header-icons-list">
                        <li>
                            {/*<button className="btn mdl-button mdl-js-button" onClick={this.props.onSave}>*/}
                                {/*<i className="btn-icon material-icons">save</i>*/}
                            {/*</button>*/}
                            <button type="button" className="btn btn-primary nav-btn pb-btn-blue" onClick={this.props.onSave}>
                                <span className="button-text">Save</span>
                            </button>
                        </li>
                        <li>
                            {/*<button className="btn mdl-button mdl-js-button" onClick={this.props.onPublish}>*/}
                                {/*<i className="btn-icon material-icons">publish</i>*/}
                            {/*</button>*/}
                            <button type="button" className="btn btn-primary nab-btn pb-btn-green" onClick={this.props.onPublish}>
                                <span className="button-text">Publish</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
