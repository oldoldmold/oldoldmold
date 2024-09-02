<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $comment = htmlspecialchars($_POST['comment']);
    
    // Open the file to append the comment
    $file = fopen('comments.txt', 'a');
    
    // Write the comment to the file
    fwrite($file, "$name: $comment\n");
    
    // Close the file
    fclose($file);
    
    // Redirect back to the comments page
    header("Location: comments.html");
    exit();
}
?>
