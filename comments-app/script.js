// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Reference to the comments collection
const commentsRef = db.collection('comments');

// Get the form and comments div
const form = document.getElementById('commentForm');
const commentsDiv = document.getElementById('comments');

// Function to display comments
function displayComments() {
    commentsDiv.innerHTML = '';
    commentsRef.orderBy('timestamp').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const data = doc.data();
            const commentElement = document.createElement('p');
            commentElement.innerHTML = `<strong>${data.name}</strong>: ${data.comment}`;
            commentsDiv.appendChild(commentElement);
        });
    });
}

// Handle form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    commentsRef.add({
        name: name,
        comment: comment,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        form.reset();
        displayComments();
    }).catch((error) => {
        console.error("Error adding comment: ", error);
    });
});

// Initial display of comments
displayComments();
