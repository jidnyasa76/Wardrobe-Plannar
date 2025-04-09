<?php
$servername = "127.0.0.1"; // Use IP instead of "localhost"
$username = "root";
$password = "";
$dbname = "Website_DB";

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Connection successful!";
}
?>
