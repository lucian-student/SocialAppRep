import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyA6zJQrQsZtPOMv3ykZ8XL9Fphem6GryS4",
    authDomain: "react-auth-87ace.firebaseapp.com",
    databaseURL: "https://react-auth-87ace.firebaseio.com",
    projectId: "react-auth-87ace",
    storageBucket: "react-auth-87ace.appspot.com",
    messagingSenderId: "810254038935",
    appId: "1:810254038935:web:b759b8412fa52987d476d2",
    measurementId: "G-M8LBWXSDNS"
  };

  export const fire = firebase.initializeApp(firebaseConfig);

  export const fireAnalitycs =  firebase.analytics();