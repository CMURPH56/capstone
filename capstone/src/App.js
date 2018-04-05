import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login'

class App extends Component {
  state = {
    isSignedIn: false // Local signed-in state.
  };

  onAuthChange(user) {
    this.setState({isSignedIn: user})
  }

  render() {
    return (
      <div>
        <Navbar signedIn={this.state.isSignedIn}/>
        <Login signedIn={this.state.isSignedIn} onAuthChange={(u) => this.onAuthChange(u)}/>
      </div>
    );
  }
}

export default App;
