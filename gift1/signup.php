<?php
include 'db_connect.php'; // Ensure database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form values safely
    $name = $_POST["name"] ?? "";
    $username = $_POST["username"] ?? "";
    $email = $_POST["email"] ?? "";
    $password = $_POST["password"] ?? "";

    if (empty($name) || empty($username) || empty($email) || empty($password)) {
        die("All fields are required.");
    }

    // Hash the password for security
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Insert into 'users' table (without password)
    $stmt1 = $conn->prepare("INSERT INTO users (name, username, email) VALUES (?, ?, ?)");
    $stmt1->bind_param("sss", $name, $username, $email);
    $stmt1->execute();

    // Insert password into 'login_credentials' table
    $stmt2 = $conn->prepare("INSERT INTO login_credentials (email, password) VALUES (?, ?)");
    $stmt2->bind_param("ss", $email, $hashed_password);
    $stmt2->execute();

    // Redirect to index.html after successful registration
    header("Location: index.html");
    exit();
} else {
    echo "Invalid request!";
}
?>
