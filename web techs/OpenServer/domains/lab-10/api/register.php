<?php
include './db.php';

$db = OpenConnection();

$userData = $_POST;
$photo_file = $_FILES['photo'];
$photo_file_name = time() . '.' . pathinfo($photo_file['name'], PATHINFO_EXTENSION);

$userData['id'] = uniqid();
$userData['photoUrl'] = '/api/assets/photos/' . $photo_file_name;
$userData['role'] = 'user';
$userData['createdAt'] = date(DATE_ATOM);
move_uploaded_file($photo_file['tmp_name'], 'assets/photos/' . $photo_file_name);

$values_string = 'id, firstName, lastName, birthDate, email, selectedLanguages, interests, photoUrl, password, role, createdAt';

if (!$db->query('SELECT 1 FROM `users`')) {
	$db->query('CREATE TABLE IF NOT EXISTS `users` (
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
		`createdAt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');

	$db->query('ALTER TABLE `users`
	ADD PRIMARY KEY (`id`),
	ADD UNIQUE KEY `email` (`email`)');
}

$db->query('INSERT INTO `users` (' . $values_string . ')
VALUES (' . BuildQueryValues($userData, $values_string) . ')');

$response = ['success' => true];
echo json_encode($response);
