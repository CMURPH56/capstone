import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {uiConfig, firebaseAuth, db} from '../config/firebase'

export default class Login extends React.Component {
  state = {
    name: ""
  }
  getName() {
    var docRef = db.collection("users").doc(firebaseAuth.currentUser.uid);
    docRef.get().then((doc) => {
      if (doc.exists) {
        this.setState({name: doc.data().name});
      } else {
        // Document not found
          this.setState({name: "No Name Found"});
      }
    }).catch(function(error) {
     console.log("Error getting document:", error);
    });
  }
  // Listen to the Firebase Auth state and set the local state.
 componentDidMount() {
   this.unregisterAuthObserver = firebaseAuth.onAuthStateChanged(
       (user) => {
         this.props.onAuthChange(!!user);
         console.log(this.props.signedIn);
         if (user) {
           // User is signed in.
           var docRef = db.collection("users").doc(user.uid);
           docRef.get().then(function(doc) {
           if (doc.exists) {
               console.log("Document exists: ", doc.data());
           } else {
             db.collection('users').doc(user.uid)
               .set({
                 name: user.displayName,
                 email: user.email
               })
               .catch(function(error) {
                 console.error("Error adding document: ", error);
               });
           }
          }).catch(function(error) {
           console.log("Error getting document:", error);
          });
         } else {
           // No user is signed in.
         }
       }
   );
 }

 // Make sure we un-register Firebase observers when the component unmounts.
 componentWillUnmount() {
  this.unregisterAuthObserver();
 }

  render() {
    if (!this.props.signedIn) {
      return (
        <section class="hero">
          <div class="hero-body">
            <div class="container">
              <h1 class="title has-text-centered">
                Please Sign in to DePaul Degree Planner
              </h1>
            </div>
            <div class="container">
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth}/>
            </div>
          </div>
        </section>
      );
    }
    else {
      return (
        <section class="hero">
          <div class="hero-body">
            <div class="container">
              <h1 class="title has-text-centered">
                {this.getName()}
                {this.state.name}&#39;s Dashboard
              </h1>
            </div>
          </div>
        </section>
      );
    }
  }
}
