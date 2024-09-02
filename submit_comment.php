<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $comment = htmlspecialchars($_POST['comment']);

    // Handle form submission, e.g., save to file or database
    $commentsFile = 'comments.txt';
    $commentEntry = "$name: $comment\n";

    file_put_contents($commentsFile, $commentEntry, FILE_APPEND);
    echo "Comment submitted successfully!";
} else {
    // If not a POST request, display an error
    echo "Invalid request method.";
}
?>

