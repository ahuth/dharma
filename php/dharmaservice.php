<?php

include_once 'overview.php';
include_once 'breakdown.php';

use \overview;
use \breakdown;
		
if (empty($_GET['type']) || empty($_GET['what']) || empty($_GET['group'])) {
	return;
}
	
$type  = strtolower(sanitizeString($_GET['type']));
$what  = strtolower(sanitizeString($_GET['what']));
$group = strtolower(sanitizeString($_GET['group']));

/* The client will expect a response in the following format:
	{
		type: 'overview' or 'breakdown',
		group: dept or area,
		what: 'karma', 'quality', 'spending', 'production',
		data: the data
	}
*/

if ($type == 'overview') {
	$output = ['type' => $type,
			   'group' => $group,
			   'what' => $what,
			   'data' => overview\getOverviewData($what, $group)];
} else if ($type == 'breakdown') {
	$output = ['type' => $type,
			   'group' => $group,
			   'what' => $what,
			   'data' => breakdown\getBreakdownData($what, $group)];
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