// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD60HY2TUpgyf_v1jwloV10_Fez6pSYe2o",
  authDomain: "birdingsnaps.firebaseapp.com",
  projectId: "birdingsnaps",
  storageBucket: "birdingsnaps.appspot.com",
  messagingSenderId: "788679175923",
  appId: "1:788679175923:web:2859e858cea365df87d186",
  measurementId: "G-P26MG4F4CK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Export the auth instance
export { auth, app };
// const analytics = getAnalytics(app);
