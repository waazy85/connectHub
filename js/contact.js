
document.addEventListener("DOMContentLoaded", function () {
    // MOBILE NAVIGATION MENU
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("show");

            menuToggle.textContent = isOpen ? "✕" : "☰";
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("show");
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // CONTACT FORM
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.reportValidity()) {
                return;
            }

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const subject = document.getElementById("subject").value;
            const location = document.getElementById("location").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !subject || !message) {
                formStatus.textContent =
                    "Please complete all required fields.";
                return;
            }

            // Prepare an email for the ConnectHub team
            const emailSubject = "ConnectHub Enquiry: " + subject;

            const emailBody = [
                "Hello ConnectHub,",
                "",
                "I would like to make an enquiry.",
                "",
                "Full Name: " + name,
                "Email Address: " + email,
                "Phone Number: " + (phone || "Not provided"),
                "Enquiry Type: " + subject,
                "Preferred Location: " + (location || "Not specified"),
                "",
                "Message:",
                message,
                "",
                "Sent through the ConnectHub contact page."
            ].join("\n");

            const mailtoLink =
                "mailto:hello@connecthub.com" +
                "?subject=" + encodeURIComponent(emailSubject) +
                "&body=" + encodeURIComponent(emailBody);

            formStatus.textContent =
                "Opening your email application. Review your message and press Send.";

            // Open the visitor's default email application
            window.location.href = mailtoLink;
        });
    }

    // AUTOMATIC COPYRIGHT YEAR
    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
