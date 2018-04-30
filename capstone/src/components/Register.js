import React, { Component } from 'react'
import { createUser } from '../helpers/auth'
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import { auth, db } from '../config/firebase';
import { loginUser } from '../actions';



export default class Register extends Component {
  state = {
    registerError: null,
    emailClass: "is-info",
    passwordClass: "is-info",
    registerLoading: ""
  }
  handleSubmit = (e) => {
    this.setState({registerLoading: "is-loading"})
    e.preventDefault()
    createUser(this.email.value, this.password.value)
      .catch((error) => {
        this.setState({registerLoading: ""})
        this.setState(this.handleErrorMsg(error))
      })
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
      case "The email address is already in use by another account.":
        return {
          emailClass: "is-danger",
          passwordClass: "is-info",
          registerError: error.message
        }
      case "Password should be at least 6 characters":
        return {
          passwordClass: "is-danger",
          emailClass: "is-info",
          registerError: error.message
        }
      default:
        return {
          passwordClass: "is-info",
          emailClass: "is-info",
          registerError: error.message
        }
    }
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
            user.updateProfile({
                  displayName: this.name.value
                }).then(() => {
                  console.log("Updated Profile!")
                }, (error) => {
                  console.log("Error updating profile:", error)
                });
            console.log("Adding document for: ", user.email)
            db.collection('users').doc(user.uid)
              .set({
                name: this.name.value,
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

  componentWillUnmount() {
    this.unsubscribe()
  }

  render () {
    return (
      <div>
      <Navbar store={this.context.store} active="Register"/>
      <div>
        <section className="hero">
          <div className="hero-body">
            <p className="title has-text-centered">
              Registration
            </p>
            <p className="subtitle has-text-centered">
              Please Register to access DePaul Degree Planner
            </p>
          </div>
        </section>

        <nav className="level">
          <div className="level-item">
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input ref={(name) => this.name = name} className="input is-info is-rounded" type="text" placeholder="Name" />
                </div>
              </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left has-icons-right">
                  <input ref={(email) => this.email = email} className={"input is-rounded " + this.state.emailClass} type="email" placeholder="Email" />
                  <span className="icon is-small is-left">
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
              <label className="label">Password</label>
                <p className="control has-icons-left has-icons-right">
                  <input ref={(pass) => this.password = pass} className={"input is-rounded " + this.state.passwordClass} type="password" placeholder="Password" />
                  <span className="icon is-small is-left">
                    <i className="fa fa-lock"></i>
                  </span>
                  {
                    this.state.passwordClass === "is-danger" &&
                    <span className="icon is-medium is-right">
                      <i className="fa fa-exclamation-triangle"></i>
                    </span>
                  }
                </p>
              </div>

              {
                this.state.registerError &&
                <p className="help is-danger">Error: {this.state.registerError}</p>
              }
              <div className="control">
                <button type="submit" className={"button is-link is-rounded " + this.state.registerLoading}>Register</button>
              </div>
            </form>
          </div>
        </nav>
      </div>
    </div>
    );
  }
}
