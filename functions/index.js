const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

/*exports.getCourses = functions.https.onRequest((req, res) => { 
  var stuff = [];
  var db = admin.firestore();
  db.collection("users").
});*/

exports.getCourses = functions.https.onRequest((request, response) => {

  var stuff = [];

  var db = admin.firestore();
  db.collection('courses/').get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      var elt = {
        subject: doc.data().CATALOG_NBR,
        catalog_nbr: doc.data().SUBJECT
      }
      stuff = stuff.concat(elt);
    });
    response.send(stuff)
    return "Got stuff."
  }).catch(reason => {
      response.send(reason)
  })
});
