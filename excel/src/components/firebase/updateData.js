var firebase = require("firebase/app");
var firebasedb = require("@firebase/database");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

var datas = [
  { age: 1, name: "ramu" },
  { age: 12, name: "jalu" },
  { age: 1234, name: "hamu" },
  { age: 15, name: "ramuh" },
  { age: 126, name: "jaluh" },
  { age: 1237, name: "hamuh" },
];

function UpdateDatabase(datas) {

  const firebaseConfig = {
    apiKey: "AIzaSyCRynWSZ7zALIvu3VjkHyvdKgTS0zCYN8Q",
    authDomain: "excel-save.firebaseapp.com",
    projectId: "excel-save",
    storageBucket: "excel-save.appspot.com",
    messagingSenderId: "326314308573",
    appId: "1:326314308573:web:122a60955d567a144cfc34",
    measurementId: "G-ZF6J4MYH59",
  };
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

  const db = firebasedb.getDatabase(app);

  var time_id = Date.now().toString() + (Math.floor(Math.random() * 10) + 1).toString();
  var path = "/" + path

  var dat = {};
  dat[path] = datas;
  firebasedb.update(firebasedb.ref(db), dat)
  return time_id;
}
var h = UpdateDatabase(datas)
console.log(h);
