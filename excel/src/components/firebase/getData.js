var firebase = require("firebase/app");
var firebasedb = require("@firebase/database");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

function getData(unix_time) {
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

  var unix_time =
    "/" + unix_time + (Math.floor(Math.random() * 10) + 1).toString();

  var datas;

  firebasedb
    .get(firebasedb.ref(db), unix_time)
    .then((snapshot) => {
      if (snapshot.exists()) {
        datas = snapshot.val();
        console.log(datas);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return datas;
}
