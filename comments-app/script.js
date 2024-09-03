// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, query, orderBy, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBrBabXZs-VVrF3Lua1C4E5qxwCIzmkuH0",
    authDomain: "comments-7c324.firebaseapp.com",
    projectId: "comments-7c324",
    storageBucket: "comments-7c324.appspot.com",
    messagingSenderId: "617355691709",
    appId: "1:617355691709:web:d7b03e2f4b2912ade819d4",
    measurementId: "G-LY0VKM82LY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Reference to the comments collection
const commentsRef = collection(db, 'comments');

// Get the form and comments div
const form = document.getElementById('commentForm');
const commentsDiv = document.getElementById('comments');

// Function to display comments
async function displayComments() {
    commentsDiv.innerHTML = '';
    try {
        const q = query(commentsRef, orderBy('timestamp'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const commentElement = document.createElement('p');
            commentElement.innerHTML = `<strong>${data.name}</strong>: ${data.comment}`;
            commentsDiv.appendChild(commentElement);
        });
    } catch (error) {
        console.error("Error fetching comments: ", error);
    }
}

// Handle form submission
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    try {
        await addDoc(commentsRef, {
            name: name,
            comment: comment,
            timestamp: serverTimestamp()
        });
        form.reset();
        displayComments();
    } catch (error) {
        console.error("Error adding comment: ", error);
    }
});

// Initial display of comments
displayComments();
