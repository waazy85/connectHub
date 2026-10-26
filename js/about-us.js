
document.addEventListener("DOMContentLoaded", function () {
    // MOBILE NAVIGATION MENU
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelector(".nav-links");

    if (navbar && navLinks) {
        let menuButton = document.querySelector(".menu-toggle");

        if (!menuButton) {
            menuButton = document.createElement("button");
            menuButton.className = "menu-toggle";
            menuButton.type = "button";
            menuButton.textContent = "☰";
            menuButton.setAttribute("aria-label", "Open navigation menu");
            menuButton.setAttribute("aria-expanded", "false");

            navbar.insertBefore(menuButton, navLinks);
        }

        menuButton.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("show");

            menuButton.textContent = isOpen ? "✕" : "☰";
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        // Close the menu after selecting a link
        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("show");
                menuButton.textContent = "☰";
                menuButton.setAttribute("aria-expanded", "false");
            });
        });
    }

    // SMOOTH SCROLLING FOR LINKS TO SECTIONS ON THIS PAGE
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // REVEAL SECTIONS AS THEY ENTER THE SCREEN
    const revealElements = document.querySelectorAll(
        ".about-section, .mission-card, .audience-card, .cta-content"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries, currentObserver) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15
            }
        );

        revealElements.forEach(function (element) {
            element.classList.add("reveal");
            observer.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }

    // UPDATE THE FOOTER YEAR AUTOMATICALLY
    const footerYear = document.querySelector(".footer-bottom p");

    if (footerYear) {
        footerYear.innerHTML = footerYear.innerHTML.replace(
            /©\s*\d{4}/,
            "© " + new Date().getFullYear()
        );
    }
});
