import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB1S1wV58phH7S9FPIiwZ0YqkYRKQ-OhpE",
    authDomain: "fir-9-810d6.firebaseapp.com",
    projectId: "fir-9-810d6",
    storageBucket: "fir-9-810d6.appspot.com",
    messagingSenderId: "678701366889",
    appId: "1:678701366889:web:53270a45fedd731e30acf8",
};
// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "books");

// get collection data
const books = [];
const docs = getDocs(colRef)
    .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id });
        });
    })
    .catch((err) => {
        console.log(err.message);
    });
console.log(books);
