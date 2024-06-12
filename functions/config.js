
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDZ_gLH3n5t91I71Vqk5aU2DrWKGEOiwzU",
  authDomain: "tesingcoze.firebaseapp.com",
  projectId: "tesingcoze",
  storageBucket: "tesingcoze.appspot.com",
  messagingSenderId: "984238245034",
  appId: "1:984238245034:web:646617a052705d93a3fcd3",
  measurementId: "G-YG31FBTGT8"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
module.exports = {analytics};