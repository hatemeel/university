<?php
include './db.php';

$db = OpenConnection();

$userId = $_REQUEST['userId'];

if ($userId) {
	$result = $db->query("SELECT * FROM `users` WHERE id='$userId'");
	$users = [];
	while ($row = $result->fetch_assoc()) {
		array_push($users, $row);
	};
	$userData = $users[0];

	$filename = explode('/', $userData['photoUrl'])[4];

	if ($db->query("DELETE FROM `users` WHERE id='$userId'") && $userData['photoUrl']) {
		unlink('assets/photos/' . $filename);
	}
}

$response = ['success' => true];

echo json_encode($response);
