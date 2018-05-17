import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { auth, db } from '../config/firebase';
import { login } from '../helpers/auth'
import { loginUser } from '../actions';
import Navbar from './Navbar';

export default class Login extends Component {
  state = {
    registerError: null,
    emailClass: "is-info",
    passwordClass: "is-info",
    loginLoading: ""
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
    })
  }

  handleErrorMsg(error) {
    switch(error.message) {
      case "The email address is badly formatted.":
        return {
          emailClass: "is-danger",
          passwordClass: "is-info",
          registerError: error.message
        }
      case "There is no user record corresponding to this identifier. The user may have been deleted.":
        return {
          emailClass: "is-danger",
          passwordClass: "is-info",
          registerError: "No User found"
        }
      case "The password is invalid or the user does not have a password.":
        return {
          passwordClass: "is-danger",
          emailClass: "is-info",
          registerError: "Invalid Password"
        }
      default:
        return {
          passwordClass: "is-info",
          emailClass: "is-info",
          registerError: error.message
        }
    }
  }

  handleLogin() {
    this.setState({loginLoading: "is-loading"})
    login(this.email.value, this.password.value)
      .catch((error) => {
        this.setState({loginLoading: ""})
        this.setState(this.handleErrorMsg(error))
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
          <Navbar store={this.context.store} active="Login"/>
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
                      <div className="control has-icons-left has-icons-right">
                        <input ref={(e) => this.email = e} className={"input is-medium is-rounded " + this.state.emailClass} type="email" placeholder="Email"/>
                        <span className="icon is-medium is-left">
                          <i className="fa fa-envelope"></i>
                        </span>
                        {
                          this.state.emailClass === "is-danger" &&
                          <span className="icon is-medium is-right">
                            <i className="fa fa-exclamation-triangle"></i>
                          </span>
                        }
                      </div>
                    </div>
                    <div className="field">
                      <div className="control has-icons-left has-icons-right">
                        <input ref={(p) => this.password = p} className={"input is-medium is-rounded " + this.state.passwordClass} type="password" placeholder="Password"/>
                        <span className="icon is-medium is-left">
                          <i className="fa fa-lock"></i>
                        </span>
                        {
                          this.state.passwordClass === "is-danger" &&
                          <span className="icon is-medium is-right">
                            <i className="fa fa-exclamation-triangle"></i>
                          </span>
                        }
                      </div>
                    </div>
                    {
                      this.state.registerError &&
                      <p className="help is-danger">Error: {this.state.registerError}</p>
                    }
                    <div className="control">
                      <button className={"button is-success is-rounded " + this.state.loginLoading} onClick={() => this.handleLogin()}>
                        Login
                      </button>
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
