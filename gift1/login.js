document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form.login-form");
    
    if (!form) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch("php/login.php", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                // Redirect to index.html on successful login
                window.location.href = "../index.html";
            } else {
                alert(result.message); // Show error message if login fails
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong. Please try again.");
        }
    });
});
