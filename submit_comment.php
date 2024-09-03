<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the form data
    $name = htmlspecialchars($_POST['name']);
    $comment = htmlspecialchars($_POST['comment']);

    // Append the comment to a file (or insert it into a database)
    $file = 'comments.txt';
    $current = file_get_contents($file);
    $current .= "<strong>$name</strong>: $comment<br>\n";
    file_put_contents($file, $current);

    // Redirect back to the comments page
    header('Location: comments.html');
    exit();
}
?>


