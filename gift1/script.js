document.addEventListener("DOMContentLoaded", function () {
    // Login Form Validation
    if (document.querySelector("form.login-form")) {
        document.querySelector("form.login-form").addEventListener("submit", function (e) {
            e.preventDefault();
            let username = document.getElementById("username").value.trim();
            let password = document.getElementById("password").value.trim();
            let rememberMe = document.getElementById("rememberMe").checked;

            if (username === "" || password === "") {
                alert("Username and Password cannot be empty");
                return;
            }

            if (rememberMe) {
                localStorage.setItem("savedUsername", username);
            } else {
                localStorage.removeItem("savedUsername");
            }

            alert("Login Successful");
            this.submit();
        });
    }

    // Sign-in Form Validation
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
                input.parentNode.insertBefore(error, input.nextSibling);
                isValid = false;
            }
    
            // Basic required field check
            if (!name.value.trim()) showError(name, "Name is required.");
            if (!username.value.trim()) showError(username, "Username is required.");
            if (!email.value.trim()) {
                showError(email, "Email is required.");
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                showError(email, "Enter a valid email address.");
            }
            if (!password.value.trim()) showError(password, "Password is required.");
            if (!confirmPassword.value.trim()) {
                showError(confirmPassword, "Confirm password is required.");
            } else if (password.value.trim() !== confirmPassword.value.trim()) {
                showError(confirmPassword, "Passwords do not match.");
            }
    
            // Prevent form submission if there are errors
            if (!isValid) return;
    
            alert("Sign Up Successful");
            form.submit();
        });
    });
    
    

    // Show Password Toggle
    document.querySelectorAll(".toggle-password").forEach(button => {
        button.addEventListener("click", function () {
            let passwordField = this.previousElementSibling;
            if (passwordField.type === "password") {
                passwordField.type = "text";
                this.textContent = "Hide";
            } else {
                passwordField.type = "password";
                this.textContent = "Show";
            }
        });
    });

    // Auto-fill remembered username
    if (localStorage.getItem("savedUsername")) {
        document.getElementById("username").value = localStorage.getItem("savedUsername");
        document.getElementById("rememberMe").checked = true;
    }
});
