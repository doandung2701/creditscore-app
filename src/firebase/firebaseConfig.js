import * as firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyBAzQZBpPHTZZs0FuQHpc47WNvnuG33d5M",
  authDomain: "rn-credit.firebaseapp.com",
  databaseURL: "https://rn-credit.firebaseio.com",
  projectId: "rn-credit",
  storageBucket: "rn-credit.appspot.com",
  messagingSenderId: "103107879965",
  appId: "1:103107879965:web:782cd8db92f7bc1dffd2f4"
};
//Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebaseConfig;