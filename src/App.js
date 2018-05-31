import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Button from './components/button.component';
import Input from './components/input.component';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Input placeholder="Title" inputId="story-title"/>
        <Button>Create</Button>
      </div>
    );
  }
}

export default App;
