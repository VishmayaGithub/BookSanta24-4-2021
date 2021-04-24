import firebase from 'firebase'
require ('@firebase/firestore')
 var firebaseConfig = {
    apiKey: "AIzaSyDM4AOCoekmWkYy8igyFnff2OPApJLKY9A",
    authDomain: "book-santa-8cd4f.firebaseapp.com",
    projectId: "book-santa-8cd4f",
    storageBucket: "book-santa-8cd4f.appspot.com",
    messagingSenderId: "965383055451",
    appId: "1:965383055451:web:1525c7e213672e82e5b77e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();  
