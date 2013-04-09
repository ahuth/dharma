<?php

include_once 'overview.php';
include_once 'breakdown.php';

use \overview;
use \breakdown;
		
if (empty($_GET['type']) || empty($_GET['what']) || empty($_GET['group'])) {
	return;
}
	
$type  = sanitizeString($_GET['type']);
$what  = sanitizeString($_GET['what']);
$group = sanitizeString($_GET['group']);
$output = [];
	
if ($type == 'overview') {
	$output = overview\getOverviewData($what, $group);
} else if ($type == 'breakdown') {
	$output = breakdown\getBreakdownData($what, $group);
} else {
	echo NULL;
	return;
}
	
echo json_encode($output);

// Render a string safe.
function sanitizeString($var) {
    $var = strip_tags($var);
    $var = stripslashes($var);
    $var = htmlentities($var);
    $var = htmlspecialchars($var);
    return $var;
}