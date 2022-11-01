import { initializeApp } from 'firebase/app';
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCTrG0zdk20x--O-84dcS5hFgtd_r7SPZ8",
    authDomain: "insta-clone-e9833.firebaseapp.com",
    databaseURL: "https://insta-clone-e9833-default-rtdb.firebaseio.com",
    projectId: "insta-clone-e9833",
    storageBucket: "insta-clone-e9833.appspot.com",
    messagingSenderId: "677644911091",
    appId: "1:677644911091:web:fda8b70df2fef2e4295286"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db };