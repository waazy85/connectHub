
const loginForm = document.getElementById("login-form");
const message = document.getElementById("message");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("toggle-password");

function showMessage(text, type) {
    message.textContent = text;
    message.className = "message show " + type;
}

togglePassword.addEventListener("click", function () {
    const hidden = passwordInput.type === "password";

    passwordInput.type = hidden ? "text" : "password";
    togglePassword.textContent = hidden ? "Hide" : "Show";
});

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        showMessage("Please complete all required fields.", "error");
        return;
    }

    if (password.length < 6) {
        showMessage("Your password must contain at least 6 characters.", "error");
        return;
    }

    showMessage(
        "The form is valid, but login is not connected to an authentication server yet.",
        "success"
    );
});

document.getElementById("forgot-password").addEventListener("click", function (event) {
    event.preventDefault();

    showMessage(
        "Password recovery is not available yet. It needs to be connected to an account system.",
        "error"
    );
});
