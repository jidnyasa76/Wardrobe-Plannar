<?php
session_start();
include 'db_connect.php'; // Ensure this file sets up $conn correctly

// Check if user is logged in
if (!isset($_SESSION['user_email'])) {
    header("Location: signin.php"); // Redirect to login page if not logged in
    exit();
}

// Fetch user details from the database
$email = $_SESSION['user_email'];
$sql = "SELECT name, username, email FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    die("Error preparing statement: " . $conn->error); // Add error handling for prepare
}

$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

// Check if user exists
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
} else {
    die("User not found in database.");
}

// Close statement to free resources
$stmt->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile</title>
    <link rel="stylesheet" href="styles2.css">
</head>
<body>
    <section class="user-profile">
        <div class="profile-info">
            <h2>User Profile</h2>
            <form id="profileForm" action="save_profile.php" method="POST" onsubmit="return validateForm()">
                <label for="name">Full Name:</label>
                <input type="text" id="name" name="name" value="<?php echo htmlspecialchars($user['name']); ?>" required>

                <label for="userid">Username:</label>
                <input type="text" id="userid" name="username" value="<?php echo htmlspecialchars($user['username']); ?>" readonly>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($user['email']); ?>" required>

                <button type="submit">Save Changes</button>
            </form>
        </div>
    </section>

    <script>
        function validateForm() {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();

            // Check if name or email is empty
            if (name === "" || email === "") {
                alert("Please fill in all required fields.");
                return false;
            }

            // Basic email format validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
                return false;
            }

            // Confirm before saving
            const confirmSave = confirm("Are you sure you want to save changes?");
            if (!confirmSave) {
                return false; // Prevent form submission if canceled
            }

            return true; // Allow form submission
        }
    </script>
</body>
</html>
<?php
// Close database connection (if not closed in db_connect.php)
if (isset($conn)) {
    $conn->close();
}
?>