import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import pubsub from 'pubsub-js';
import Intro from './components/intro.component';
import CreatorScreen from './components/creator-screen.component';

const screens = {
  intro: Intro,
  creator: CreatorScreen,
  // publish: Publish,
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentScreen: 'intro'
    };

    pubsub.subscribe('navigate', (event, { screen }) => {
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
