import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    onSnapshot,
    addDoc,
    doc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
} from "firebase/firestore";

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

// queries
const q = query(colRef, orderBy("createdAt"));

// real time collection data

onSnapshot(q, (snapshot) => {
    const books = [];
    snapshot.docs.forEach((doc) => {
        books.push({ id: doc.id, ...doc.data() });
    });
    console.log(books);
});
//  adding documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp(),
    }).then(() => {
        addBookForm.reset();
    });
});

//  deleting documents
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const docRef = doc(db, "books", deleteBookForm.id.value);

    deleteDoc(docRef).then(() => {
        deleteBookForm.reset();
    });
});
