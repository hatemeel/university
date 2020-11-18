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
