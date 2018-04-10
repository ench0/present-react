import React, { Component } from 'react';

import './style/normalize.css';
import './style/App.css';

import Poster from './components/Poster';
import News from './components/News';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Poster
          // prayers={this.state.prayers} jamaahShow={this.state.jamaahShow}
        />
        <News
          // prayers={this.state.prayers} jamaahShow={this.state.jamaahShow}
        />
        <div
          // prayers={this.state.prayers} jamaahShow={this.state.jamaahShow}
        />
      </div>
    );
  }
}

export default App;
