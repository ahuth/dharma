<?php

if (!empty($_POST['group']) {
	$group = sanitizeString($_POST['group']);
}

// Render a string safe.
function sanitizeString($var) {
    $var = strip_tags($var);
    $var = stripslashes($var);
    $var = htmlentities($var);
    $var = htmlspecialchars($var);
    return $var;
}