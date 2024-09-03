<?php
// Read the contents of the comments file and display them
$file = 'comments.txt';
if (file_exists($file)) {
    echo file_get_contents($file);
} else {
    echo "No comments yet.";
}
?>
