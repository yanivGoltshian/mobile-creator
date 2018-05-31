import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import pubsub from 'pubsub-js';
import Intro from './components/intro.component';

const screens = {
  intro: Intro,
  // creator: Creator,
  // publish: Publish,
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentScreen: 'intro'
    };

    pubsub.subscribe('navigate', ({ screen }) => {
      this.setState({ currentScreen: screen });
    });
  }

  render() {
    const Screen = screens[this.state.currentScreen];

    return (
      <div className="App">
        <Screen />
      </div>
    );
  }
}

export default App;
