import React, { Component } from 'react';
import { db } from '../config/firebase';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Navbar from './Navbar';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      degree: "Computer Science",
      concentration: "Software and Systems Development",
      numCourses: 1,
      updating: false,
      updateLoading: ""
    }
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentDidMount() {
    if (this.context.store.getState().user) {
      this.getProfile();
    }
  }

  getProfile = () => {
    var docRef = db.collection("users").doc(this.context.store.getState().user.uid);
    docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Getting user profile!");
        // Only update state if they already have previously stored data
        if (doc.data()['name'] && doc.data()['degree']){
          this.setState({
            name: doc.data()['name'],
            degree: doc.data()['degree'],
            concentration: doc.data()['concentration'],
            numCourses: doc.data()['numCourses']
          });
        }
        else {
          this.setState({
            name: doc.data()['name']
          })
        }
        console.log(this.state)
    } else {
        console.log("User doesn't exist!")
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
   });
  }

  degreeChanged = (e) => {
    this.setState({degree: e.target.value});
  }

  concentrationChanged = (e) => {
    this.setState({concentration: e.target.value});
  }

  numCoursesChanged = (e) => {
    this.setState({numCourses: e.target.value});
  }

  nameChanged = (e) => {
    this.setState({name: e.target.value});
  }

  closeNotification = () => {
    this.setState({updating: false});
  }

  updateProfile = () => {
    this.setState({updateLoading: "is-loading"})
    const user = this.context.store.getState().user
    var docRef = db.collection("users").doc(user.uid);
    docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Updating user!");
        db.collection('users').doc(user.uid)
          .set({
            name: this.state.name,
            degree: this.state.degree,
            concentration: this.state.concentration,
            numCourses: this.state.numCourses
          }, { merge: true })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        user.updateProfile({
            displayName: this.state.name
          }).then(() => {
            console.log("Updated Firebase User Profile Name: ", user.displayName)
          }).catch((error) => {
            console.error("Error updating profile: ", error);
          });
        this.setState({updating: true, updateLoading: ""});
    } else {
        console.log("User doesn't exist!")
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
   });
  }
  render () {
    if (this.context.store.getState().user){
      return (
        <div>
          <Navbar store={this.context.store} active="Profile"/>
          {
            this.state.updating ?
            <div className="notification is-success">
              <button className="delete" onClick={this.closeNotification}></button>
              <div className="container">
                <h1 className="title has-text-centered">Update Successful!</h1>
              </div>
            </div>
            :
            <div></div>
          }
          <section className="section">
            <div className="container">
              <h1 className="title has-text-left">
                Profile
              </h1>
            </div>
          </section>
          <section className="section">
            <div className="columns">
              <div className="column">
                <div className="container is-fluid">
                  <div className="field is-horizontal">
                    <div className="field-label">
                      <label className="label is-medium">Name</label>
                    </div>
                    <div className="field-body">
                      <div className="control">
                        <input className="input is-medium is-info is-rounded" type="text" value={this.state.name} onChange={this.nameChanged}/>
                      </div>
                    </div>
                  </div>
                  <div className="field is-horizontal">
                    <div className="field-label">
                      <label className="label is-medium">Email</label>
                    </div>
                    <div className="field-body">
                      <div className="control">
                        <input className="input is-medium is-info is-rounded" type="text" value={this.context.store.getState().user.email} disabled/>
                      </div>
                    </div>
                  </div>
                  <div className="field is-horizontal">
                    <div className="field-label">
                      <label className="label is-medium">Degree</label>
                    </div>
                    <div className="field-body">
                      <div className="control">
                        <div className="select is-medium is-info is-rounded">
                          <select value={this.state.degree} onChange={this.degreeChanged}>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Information Systems">Information Systems</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="field is-horizontal">
                    <div className="field-label">
                      <label className="label is-medium">Concentration</label>
                    </div>
                    <div className="field-body">
                      <div className="control">
                        <div className="select is-medium is-info is-rounded">
                        {
                          this.state.degree !== "Information Systems" ?
                          <select value={this.state.concentration} onChange={this.concentrationChanged}>
                            <option value="Software and Systems Development">Software and Systems Development</option>
                            <option value="Theory">Theory</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Database Systems">Database Systems</option>
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                            <option value="Software Engineering">Software Engineering</option>
                            <option value="Game and Real-Time Systems">Game and Real-Time Systems</option>
                            <option value="Human-Computer Interaction">Human-Computer Interaction</option>
                          </select>
                          :
                          <select value={this.state.concentration} onChange={this.concentrationChanged}>
                            <option value="Business Analysis/Systems Analysis">Business Analysis/Systems Analysis</option>
                            <option value="Business Intelligence">Business Intelligence</option>
                            <option value="Database Administration">Database Administration</option>
                            <option value="IT Enterprise Management">IT Enterprise Management</option>
                            <option value="Standard">Standard</option>
                          </select>
                        }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="field is-horizontal">
                    <div className="field-label">
                      <label className="label is-medium"># Courses per Quarter</label>
                    </div>
                    <div className="field-body">
                      <div className="control">
                        <div className="select is-medium is-info is-rounded">
                          <select value={this.state.numCourses} onChange={this.numCoursesChanged}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="field is-horizontal">
                    <div className="field-label">
                      <label className="label is-medium"></label>
                    </div>
                    <div className="field-body">
                      <div className="control">
                        <button className={"button is-link is-rounded " + this.state.updateLoading} onClick={this.updateProfile}>Update</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }
    return <Redirect to="/login"/>
  }
}
