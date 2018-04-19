import React, { Component } from 'react'
import { db } from '../config/firebase';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      degree: "Computer Science",
      concentration: "",
      numCourses: 1,
      updating: false
    }
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = () => {
    var docRef = db.collection("users").doc(this.props.user.uid);
    docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Getting user profile!");
        // Only update state if they already have previously stored data
        if (doc.data()['degree']) {
          this.setState({
            degree: doc.data()['degree'],
            concentration: doc.data()['concentration'],
            numCourses: doc.data()['numCourses']
          });
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

  closeNotification = () => {
    this.setState({updating: false});
  }

  updateProfile = () => {
    var docRef = db.collection("users").doc(this.props.user.uid);
    docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Updating user!");
        db.collection('users').doc(this.props.user.uid)
          .set({
            degree: this.state.degree,
            concentration: this.state.concentration,
            numCourses: this.state.numCourses
          }, { merge: true })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        this.setState({updating: true});
    } else {
        console.log("User doesn't exist!")
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
   });
  }
  render () {
    return (
      <div>
        {
          this.state.updating ?
          <div class="notification is-success">
            <button class="delete" onClick={this.closeNotification}></button>
            <div class="container">
              <h1 class="title has-text-centered">Update Successful!</h1>
            </div>
          </div>
          :
          <div></div>
        }
        <section class="section">
          <div class="container">
            <h1 class="title has-text-left">
              Profile
            </h1>
          </div>
        </section>
        <section class="section">
          <div class="columns">
            <div class="column">
              <div class="container is-fluid">
                <div class="field is-horizontal">
                  <div class="field-label">
                    <label class="label is-medium">Name</label>
                  </div>
                  <div class="field-body">
                    <div class="control">
                      <input class="input is-medium is-info is-rounded" type="text" value={this.props.user.displayName} disabled/>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label">
                    <label class="label is-medium">Email</label>
                  </div>
                  <div class="field-body">
                    <div class="control">
                      <input class="input is-medium is-info is-rounded" type="text" value={this.props.user.email} disabled/>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label">
                    <label class="label is-medium">Degree</label>
                  </div>
                  <div class="field-body">
                    <div class="control">
                      <div class="select is-medium is-info is-rounded">
                        <select value={this.state.degree} onChange={this.degreeChanged}>
                          <option value="Computer Science">Computer Science</option>
                          <option value="Information Systems">Information Systems</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label">
                    <label class="label is-medium">Concentration</label>
                  </div>
                  <div class="field-body">
                    <div class="control">
                      <div class="select is-medium is-info is-rounded">
                      {
                        this.state.degree === "Computer Science" ?
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
                <div class="field is-horizontal">
                  <div class="field-label">
                    <label class="label is-medium"># Courses per Quarter</label>
                  </div>
                  <div class="field-body">
                    <div class="control">
                      <div class="select is-medium is-info is-rounded">
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
                <div class="field is-horizontal">
                  <div class="field-label">
                    <label class="label is-medium"></label>
                  </div>
                  <div class="field-body">
                    <div class="control">
                      <button class="button is-link" onClick={this.updateProfile}>Update</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="container is-fluid">
                <figure class="image is-128x128">
                  <img src={this.props.user.photoURL} alt="Profile"/>
                </figure>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
