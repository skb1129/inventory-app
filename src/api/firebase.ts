import firebase from "firebase";

const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

let db: firebase.firestore.Firestore;
let googleAuth: firebase.auth.GoogleAuthProvider;

function connect(): void {
  firebase.initializeApp(config);
  db = firebase.firestore();
  googleAuth = new firebase.auth.GoogleAuthProvider();
}

function disconnect(): void {
  firebase
    .app()
    .delete()
    .then(() => console.log("Firebase app deleted successfully."))
    .catch((error) => console.log("Error delete Firebase app", error));
}

export { firebase, db, googleAuth, connect, disconnect };
