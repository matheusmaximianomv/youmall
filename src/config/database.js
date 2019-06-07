import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB5BRCFwp7MBKhXTmJLU0PjBKJSqfoR92w",
    authDomain: "youmall.firebaseapp.com",
    databaseURL: "https://youmall.firebaseio.com",
    projectId: "youmall",
    storageBucket: "youmall.appspot.com",
    messagingSenderId: "129604296250",
    appId: "1:129604296250:web:0779d4731201325c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export default firebase;
export {firebase, auth, db, storage};