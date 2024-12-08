// app.js

  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCQJkYDkB9sgrZDATRNnaQ-TI6fVIjf8a8",
    authDomain: "urban-cooling-1641a.firebaseapp.com",
    projectId: "urban-cooling-1641a",
    storageBucket: "urban-cooling-1641a.firebasestorage.app",
    messagingSenderId: "213613348671",
    appId: "1:213613348671:web:9a91c8fd49fcdc9565358a",
    measurementId: "G-PZX3QS8865"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export default app;
