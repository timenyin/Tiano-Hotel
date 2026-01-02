document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone_number").value.trim();
    const subject = document.getElementById("msg_subject").value.trim();
    const message = document.getElementById("message").value.trim();
    const terms = document.getElementById("terms").checked;
    const msgBox = document.getElementById("msgSubmit");

    // Reset message
    msgBox.className = "";
    msgBox.textContent = "";

    // Validation rules
    if (!name || !email || !phone || !subject || !message) {
        showError("All fields are required.");
        return;
    }

    if (!validateEmail(email)) {
        showError("Please enter a valid email address.");
        return;
    }

    if (!terms) {
        showError("You must accept the Terms & Conditions.");
        return;
    }

    // Netlify submission
    const formData = new FormData(this);

    fetch("/", {
        method: "POST",
        body: formData
    })
    .then(() => {
        msgBox.className = "h4 text-success mt-4  ";
        msgBox.textContent = "Message sent successfully!";
        document.getElementById("contactForm").reset();
    })
    .catch(() => {
        showError("Something went wrong. Please try again.");
    });

    function showError(message) {
        msgBox.className = "h4 text-danger shake animated";
        msgBox.textContent = message;
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});
