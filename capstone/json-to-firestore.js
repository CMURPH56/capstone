const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
  apiKey: 'AIzaSyCJjl3-_mNXXYS0MWm9fDAvaIDhT3c2dgs',
  authDomain: 'csc394-capstone.firebaseapp.com',
  projectId: 'csc394-capstone'
});


const data = require("./coursesFinal.json");



data && Object.keys(data).forEach(key => {
    const nestedContent = data[key];

    if (typeof nestedContent === "object") {
        Object.keys(nestedContent).forEach(docTitle => {
            firebase.firestore()
                .collection(key)
                .doc(docTitle)
                .set(nestedContent[docTitle])
                .then((res) => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        });
    }
});