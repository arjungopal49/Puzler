import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyApikzPx0NjZ1iD85T2dO95yq4W9TJkGHU",
  authDomain: "puzler-9575d.firebaseapp.com",
  databaseURL: "https://puzler-9575d-default-rtdb.firebaseio.com",
  projectId: "puzler-9575d",
  storageBucket: "puzler-9575d.appspot.com",
  messagingSenderId: "397073809979",
  appId: "1:397073809979:web:81f797f79f96b36bc4921e",
  measurementId: "G-H8DTT09BM8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;



