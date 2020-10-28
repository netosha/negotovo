import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCcfvsE1emGc17K-YtqnvwlZQBITqJ9aSA",
    authDomain: "test-4d9f8.firebaseapp.com",
    databaseURL: "https://test-4d9f8.firebaseio.com",
    projectId: "test-4d9f8",
    storageBucket: "test-4d9f8.appspot.com",
    messagingSenderId: "908304257399",
    appId: "1:908304257399:web:68d84d6df0d3cbeaead172",
    measurementId: "G-RXYQZ4T1L5"
}
firebase.initializeApp(firebaseConfig)

const firestore = firebase.firestore()
export default  firestore


