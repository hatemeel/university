<?php

function OpenConnection()
{
	$dbhost = "localhost";
	$dbuser = "mysql";
	$dbpass = "mysql";
	$dbname = "labs";

	$connection = new mysqli($dbhost, $dbuser, $dbpass) or die("Connect failed: %s\n" . $connection->error);

	$db = $connection->select_db($dbname);

	if (!$db) {
		$connection->query('CREATE DATABASE ' . $dbname);
		$connection->select_db($dbname);
	}

	CheckUsersTable($connection);

	return $connection;
}

function CloseConnection($connection)
{
	$connection->close();
}

function BuildQueryValues($array, $queue)
{
	$queue = explode(',', $queue);
	$queued = [];

	for ($i = 0; $i < sizeof($queue); $i++) {
		array_push($queued, $array[trim($queue[$i])]);
	}

	return '\'' . implode('\',\'', $queued) . '\'';
}

function CheckUsersTable($db)
{
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
}
