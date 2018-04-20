import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { auth, db } from './config/firebase';
import { login } from './helpers/auth'
import { Link } from 'react-router-dom';
import { loginUser } from './actions';
import Navbar from './components/Navbar';

class App extends Component {

  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
    })
  }

  componentDidMount() {
     this.unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        this.context.store.dispatch(loginUser(user));
        var docRef = db.collection("users").doc(user.uid);
        docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document exists: ", doc.data());
        } else {
            console.log("Adding document for: ", user.email)
            db.collection('users').doc(user.uid)
              .set({
                name: user.displayName,
                email: user.email
              })
              .catch((error) => {
                console.error("Error adding document: ", error);
              });
        }
        this.context.router.history.push('/profile')
      }).catch((error) => {
        console.log("Error getting document:", error);
       });
      }
    });
  }

  componentWillUnmount(){
    this.unsubscribe()
  }
  render() {
      return (
      <div>
          <Navbar store={this.context.store}/>
          <div>
            <section className="section">
              <div className="container">
                <h1 className="title has-text-centered">
                  Please Sign in to DePaul Degree Planner
                </h1>
              </div>
            </section>
            <section className="section">
              <div className="columns">
                <div className="column">
                  <div className="container is-fluid"/>
                </div>
                <div className="column">
                  <div className="container is-fluid">
                    <div className="field">
                      <div className="control has-icons-left">
                        <input ref={(e) => this.email = e} className="input is-medium is-info is-rounded" type="email" placeholder="Email"/>
                        <span className="icon is-medium is-left">
                          <i className="fa fa-envelope"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control has-icons-left">
                        <input ref={(p) => this.password = p} className="input is-medium is-info is-rounded" type="password" placeholder="Password"/>
                        <span className="icon is-medium is-left">
                          <i className="fa fa-lock"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field is-grouped">
                      <div className="control">
                        <button className="button is-success is-rounded" onClick={() => login(this.email.value, this.password.value)}>
                          Login
                        </button>
                      </div>
                      <div className="control">
                        <Link to="/register"><button className="button is-link is-rounded">
                          Sign Up
                        </button></Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="container is-fluid"/>
                </div>
              </div>
            </section>
          </div>
      </div>
    );
  }
}

export default App;
