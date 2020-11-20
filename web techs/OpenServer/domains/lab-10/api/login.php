<?php
include './db.php';

$db = OpenConnection();

$authData = $_POST;
$email = $authData['email'];
$password = $authData['password'];
$authToken = null;

if ($db->query('SELECT 1 FROM `users`')) {
	$result = $db->query("SELECT * FROM `users` WHERE email='$email' AND password='$password'");
	$users = [];

	while ($row = $result->fetch_assoc()) {
		array_push($users, $row);
	};

	if (!empty($users)) {
		$authToken = uniqid('auth-token-', true);
		$db->query("UPDATE `users` SET authToken='$authToken' WHERE email='$email'");
		$response = ['success' => true, 'authToken' => $authToken];
	} else {
		$response = ['success' => false, 'message' => 'Invalid email or password'];
	}
} else {
	$response = ['success' => false, 'message' => 'Invalid email or password'];
}

echo json_encode($response);
