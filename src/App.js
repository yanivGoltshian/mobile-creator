import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Intro from './components/intro.component';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Intro />
      </div>
    );
  }
}

export default App;
