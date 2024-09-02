<?php
// Check if the comments file exists
if (file_exists('comments.txt')) {
    // Read the file contents
    $comments = file('comments.txt');
    
    // Display each comment
    foreach ($comments as $comment) {
        echo "<p>" . htmlspecialchars($comment) . "</p>";
    }
} else {
    echo "<p>No comments yet.</p>";
}
?>
