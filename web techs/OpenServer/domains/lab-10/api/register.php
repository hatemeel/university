<?php
include './db.php';

$db = OpenConnection();

$userData = $_POST;
$photo_file = $_FILES['photo'];
$photo_file_name = time() . '.' . pathinfo($photo_file['name'], PATHINFO_EXTENSION);

$userData['id'] = uniqid();
if ($photo_file) {
	$userData['photoUrl'] = '/api/assets/photos/' . $photo_file_name;
} else {
	$userData['photoUrl'] = '';
}
$userData['role'] = 'user';
$userData['createdAt'] = date(DATE_ATOM);
$userData['authToken'] = null;

$values_string = 'id, firstName, lastName, birthDate, email, selectedLanguages, interests, photoUrl, password, role, createdAt, authToken';

if (!$db->query('SELECT 1 FROM `users`')) {
	$db->query('CREATE TABLE `users` (
		`id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
		`firstName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
		`lastName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
		`birthDate` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
		`email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
		`selectedLanguages` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
		`interests` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
		`photoUrl` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
		`password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
		`role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
		`createdAt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
		`authToken` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');

	$db->query('ALTER TABLE `users`
	ADD PRIMARY KEY (`id`),
	ADD UNIQUE KEY `email` (`email`)');
}

$email = $userData['email'];
$result = $db->query("SELECT * FROM `users` WHERE email='$email'");
$users = [];
while ($row = $result->fetch_assoc()) {
	array_push($users, $row);
};

if (empty($users)) {
	move_uploaded_file($photo_file['tmp_name'], 'assets/photos/' . $photo_file_name);
	$db->query('INSERT INTO `users` (' . $values_string . ')
	VALUES (' . BuildQueryValues($userData, $values_string) . ')');

	$response = ['success' => true];
} else {
	$response = ['success' => false, 'message' => 'User with same email already exists'];
}

echo json_encode($response);
