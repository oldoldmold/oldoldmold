// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBrBabXZs-VVrF3Lua1C4E5qxwCIzmkuH0",
    authDomain: "comments-7c324.firebaseapp.com",
    databaseURL: "https://comments-7c324-default-rtdb.firebaseio.com",
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
    }).catch((error) => {
        console.error("Error fetching comments: ", error);
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
