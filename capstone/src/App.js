import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { auth, provider, db } from './config/firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }
  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
        // User is signed in.
        var docRef = db.collection("users").doc(result.user.uid);
        docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document exists: ", doc.data());
        } else {
            console.log("Adding document for: ", result.user.email)
            db.collection('users').doc(result.user.uid)
              .set({
                name: result.user.displayName,
                email: result.user.email
              })
              .catch(function(error) {
                console.error("Error adding document: ", error);
              });
        }
       }).catch(function(error) {
        console.log("Error getting document:", error);
       });
      });
  }

  render() {
    return (
      <div>
        <Navbar user={this.state.user} login={() => this.login()} logout={() => this.logout()}/>
        {
          this.state.user ?
          <div>
          <section class="hero">
            <div class="hero-body">
              <div class="container">
                <h1 class="title has-text-centered">
                  {this.state.user.displayName}&#39;s Dashboard
                </h1>
              </div>
            </div>
          </section>
          </div>
          :
          <section class="hero">
            <div class="hero-body">
              <div class="container">
                <h1 class="title has-text-centered">
                  Please Sign in to DePaul Degree Planner
                </h1>
              </div>
            </div>
          </section>
        }
      </div>
    );
  }
}

export default App;
