document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form.signup-form");
    
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Get input values
        const name = document.getElementById("name");
        const username = document.getElementById("username");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirm_password");
        
        let isValid = true;

        // Reset previous error messages
        document.querySelectorAll(".error-message").forEach(el => el.remove());

        function showError(input, message) {
            const error = document.createElement("div");
            error.className = "error-message";
            error.style.color = "red";
            error.textContent = message;
            const container = input.closest('.password-container') || input.parentNode;
            container.parentNode.insertBefore(error, container.nextSibling);
            isValid = false;
        }

        // Basic required field check
        if (!name.value.trim()) showError(name, "Name is required.");
        if (!username.value.trim()) showError(username, "Username is required.");
        if (!email.value.trim()) showError(email, "Email is required.");
        if (!password.value.trim()) showError(password, "Password is required.");
        if (!confirmPassword.value.trim()) showError(confirmPassword, "Confirm Password is required.");

        // Email format validation
        if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            showError(email, "Enter a valid email address.");
        }
        
        // Password validation (8+ characters, 1 number, 1 special character)
        if (password.value.trim() && !/(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}/.test(password.value.trim())) {
            showError(password, "Password must be at least 8 characters long, include a number and a special character.");
        }
        
        // Confirm password match check
        if (password.value.trim() && confirmPassword.value.trim() && password.value.trim() !== confirmPassword.value.trim()) {
            showError(confirmPassword, "Passwords do not match.");
        }

        // Prevent form submission if there are errors
        if (!isValid) return;

        alert("Sign Up Successful");
        form.submit();
    });
});

// jQuery for Eye Toggle Buttons
$(document).ready(function() {
    $(".toggle-password").click(function() {
        let input = $(this).closest('.password-container').find('input');

        if (input.attr("type") === "password") {
            input.attr("type", "text");
            $(this).removeClass("fa-eye-slash").addClass("fa-eye");
        } else {
            input.attr("type", "password");
            $(this).removeClass("fa-eye").addClass("fa-eye-slash");
        }
    });
});