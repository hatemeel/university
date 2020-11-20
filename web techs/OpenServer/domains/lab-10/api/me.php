<?php
include './db.php';

$db = OpenConnection();

$authToken = apache_request_headers()['authorization'];

$result = $db->query("SELECT firstName, lastName, birthDate, email, selectedLanguages, interests, photoUrl, role, createdAt FROM `users` WHERE authToken='$authToken'");
$users = [];
while ($row = $result->fetch_assoc()) {
	array_push($users, $row);
};

$response = ['success' => true, 'userData' => $users[0]];

echo json_encode($response);
