<?php
include './db.php';

$db = OpenConnection();

$search = $_REQUEST['search'];

$authToken = apache_request_headers()['authorization'];
$isAdmin = false;

if ($search) {
	$result = $db->query("SELECT id, firstName, lastName, birthDate, email, selectedLanguages, interests, photoUrl, role, createdAt, authToken 
	FROM `users`
	WHERE firstName LIKE '%$search%' OR lastName LIKE '%$search%' OR email LIKE '%$search%'
	");
} else {
	$result = $db->query("SELECT id, firstName, lastName, birthDate, email, selectedLanguages, interests, photoUrl, role, createdAt, authToken 
	FROM `users`
	");
}
$users = [];

while ($row = $result->fetch_assoc()) {
	if ($row['authToken'] === $authToken) {
		$row['isMe'] = true;
		$isAdmin = $row['role'] === 'admin';
	} else {
		$row['isMe'] = false;
	}
	unset($row['authToken']);
	array_push($users, $row);
};

$response = ['success' => true, 'users' => $users, 'isAdmin' => $isAdmin];

echo json_encode($response);
