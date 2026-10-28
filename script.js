const passwordToggles = document.querySelectorAll(".toggle-password");

passwordToggles.forEach(function (button) {
    button.addEventListener("click", function () {

        const inputId = button.getAttribute("aria-controls");
        const passwordInput = document.getElementById(inputId);

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            button.textContent = "HIDE";
            button.setAttribute("aria-label", "Hide password");
            button.setAttribute("aria-pressed", "true");
        } else {
            passwordInput.type = "password";
            button.textContent = "SHOW";

            const fieldName =
                inputId === "password"
                    ? "password"
                    : "confirm password";

            button.setAttribute(
                "aria-label",
                "Show " + fieldName
            );

            button.setAttribute("aria-pressed", "false");
        }
    });
});




const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

passwordInput.addEventListener("input", function () {
    const password = passwordInput.value;

    let score = 0;

    // Check the password's characteristics
    if (password.length >= 8) {
        score++;
    }

    if (/[a-z]/.test(password)) {
        score++;
    }

    if (/[A-Z]/.test(password)) {
        score++;
    }

    if (/[0-9]/.test(password)) {
        score++;
    }

    if (/[^a-zA-Z0-9]/.test(password)) {
        score++;
    }

    // Reset the meter when the field is empty
    if (password.length === 0) {
        strengthBar.style.width = "0";
        strengthText.textContent =
            "Password strength: Not entered";
        return;
    }

    // Determine the strength level
    let strength = "";
    let color = "";
    let width = "";

    if (score <= 2) {
        strength = "Weak";
        color = "#ff4d6d";
        width = "25%";
    } else if (score === 3) {
        strength = "Fair";
        color = "#ffb84d";
        width = "50%";
    } else if (score === 4) {
        strength = "Good";
        color = "#36e8f5";
        width = "75%";
    } else {
        strength = "Strong";
        color = "#48e59b";
        width = "100%";
    }

    // Update the visual meter and text
    strengthBar.style.width = width;
    strengthBar.style.backgroundColor = color;

    strengthText.textContent =
        "Password strength: " + strength;
        strengthText.style.color = color;
});


const signupForm = document.getElementById("signupForm");

const callsignInput = document.getElementById("callsign");
const emailInput = document.getElementById("email");

const callsignError = document.getElementById("callsignError");
const emailError = document.getElementById("emailError");

// Check the callsign
function validateCallsign() {
    const callsign = callsignInput.value.trim();

    if (callsign === "") {
        callsignError.textContent = "Please enter your callsign.";
        callsignInput.setAttribute("aria-invalid", "true");
        return false;
    }

    if (callsign.length < 3) {
        callsignError.textContent =
            "Callsign must contain at least 3 characters.";
        callsignInput.setAttribute("aria-invalid", "true");
        return false;
    }

    callsignError.textContent = "";
    callsignInput.removeAttribute("aria-invalid");

    return true;
}

// Check the email
function validateEmail() {
    const email = emailInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailError.textContent = "Please enter your email address.";
        emailInput.setAttribute("aria-invalid", "true");
        return false;
    }

    if (!emailPattern.test(email)) {
        emailError.textContent =
            "Please enter a valid email address.";
        emailInput.setAttribute("aria-invalid", "true");
        return false;
    }

    emailError.textContent = "";
    emailInput.removeAttribute("aria-invalid");

    return true;
}

// Validate while the user types
callsignInput.addEventListener("input", validateCallsign);
emailInput.addEventListener("input", validateEmail);


const passwordError = document.getElementById("passwordError");

function validatePassword() {
    const password = passwordInput.value;

    if (password === "") {
        passwordError.textContent = "Please enter a password.";
        passwordInput.setAttribute("aria-invalid", "true");
        return false;
    }

    if (password.length < 8) {
        passwordError.textContent =
            "Password must contain at least 8 characters.";
        passwordInput.setAttribute("aria-invalid", "true");
        return false;
    }

    passwordError.textContent = "";
    passwordInput.removeAttribute("aria-invalid");

    return true;
}

passwordInput.addEventListener("input", validatePassword);



const confirmPasswordInput = document.getElementById("confirmPassword");
const confirmPasswordError = document.getElementById("confirmPasswordError");

function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (confirmPassword === "") {
        confirmPasswordError.textContent =
            "Please confirm your password.";

        confirmPasswordInput.setAttribute("aria-invalid", "true");
        return false;
    }

    if (password !== confirmPassword) {
        confirmPasswordError.textContent =
            "Passwords do not match.";

        confirmPasswordInput.setAttribute("aria-invalid", "true");
        return false;
    }

    confirmPasswordError.textContent = "";
    confirmPasswordInput.removeAttribute("aria-invalid");

    return true;
}

confirmPasswordInput.addEventListener("input", validateConfirmPassword);
passwordInput.addEventListener("input", function () {
    if (confirmPasswordInput.value !== "") {
        validateConfirmPassword();
    }
});



const termsCheckbox = document.getElementById("terms");
const termsError = document.getElementById("termsError");

function validateTerms() {
    if (!termsCheckbox.checked) {
        termsError.textContent =
            "You must agree to the terms and conditions.";

        termsCheckbox.setAttribute("aria-invalid", "true");
        return false;
    }

    termsError.textContent = "";
    termsCheckbox.removeAttribute("aria-invalid");

    return true;
}

termsCheckbox.addEventListener("change", validateTerms);


signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const isCallsignValid = validateCallsign();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const areTermsValid = validateTerms();

    if (
        isCallsignValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid &&
        areTermsValid
    ) {
        submitButton.disabled = true;
        submitButton.textContent = "CREATING ACCOUNT...";

        formMessage.textContent = "Please wait while we create your account...";
        formMessage.style.color = "#36e8f5";

        setTimeout(function () {
            submitButton.disabled = false;
            submitButton.textContent = "ACCOUNT CREATED!";

            formMessage.textContent =
                "Success! Your NEONCORE signup is complete.";

            formMessage.style.color = "#48e59b";
        }, 2000);
    }
});

const submitButton = document.getElementById("submitButton");
const formMessage = document.getElementById("formMessage");


signupForm.addEventListener("input", resetSignupState);
signupForm.addEventListener("change", resetSignupState);

function resetSignupState() {
    submitButton.disabled = false;
    submitButton.textContent = "CREATE ACCOUNT";

    formMessage.textContent = "";
    formMessage.style.color = "";

    validateCallsign();
    validateEmail();
    validatePassword();

    if (confirmPasswordInput.value !== "") {
        validateConfirmPassword();
    }

    if (termsCheckbox.checked) {
        validateTerms();
    }
}