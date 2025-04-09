<?php
$servername = "sql109.infinityfree.com"; // Change if using a different host
$username = "if0_38667472"; // Change to your MySQL username
$password = "hy667VMVpBqNwV6"; // Change to your MySQL password
$dbname = "if0_38667472_wardrobe"; // Database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
else echo"connection done";
?>
