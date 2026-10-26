
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Automatically display the current year.
document.getElementById("year").textContent =
    new Date().getFullYear();

// Smooth scrolling for the services button.
document.querySelectorAll('a[href="#our-services"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        document.getElementById("our-services").scrollIntoView({
            behavior: "smooth"
        });

        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});
