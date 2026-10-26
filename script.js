
/* ========================================
   CONNECTHUB - JAVASCRIPT
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    // ---------- 1. Automatic Copyright Year ----------

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // ---------- 2. Property Search ----------

    const searchForm = document.getElementById("property-search");
    const locationInput = document.getElementById("location");
    const propertyType = document.getElementById("property-type");
    const purposeSelect = document.getElementById("purpose");

    const propertyCards = Array.from(
        document.querySelectorAll(".property-card")
    );

    const propertyGrid = document.querySelector(".property-grid");
    const propertiesSection = document.getElementById("properties");

    if (
        searchForm &&
        locationInput &&
        propertyType &&
        purposeSelect &&
        propertyGrid &&
        propertiesSection
    ) {

        // Create a message area for search results.
        const resultsMessage = document.createElement("div");

        resultsMessage.className = "search-results";
        resultsMessage.setAttribute("role", "status");
        resultsMessage.setAttribute("aria-live", "polite");

        propertyGrid.parentNode.insertBefore(
            resultsMessage,
            propertyGrid
        );


        // Identify each property's category and purpose.
        function getPropertyDetails(card) {

            const title = (
                card.querySelector("h3")?.textContent || ""
            ).toLowerCase();

            const label = (
                card.querySelector(".property-label")?.textContent || ""
            ).toLowerCase();

            let type = "other";

            if (title.includes("apartment")) {
                type = "apartment";
            } else if (
                title.includes("land")
            ) {
                type = "land";
            } else if (
                title.includes("commercial") ||
                title.includes("office") ||
                title.includes("shop")
            ) {
                type = "commercial";
            } else if (
                title.includes("home") ||
                title.includes("house")
            ) {
                type = "house";
            }

            let purpose = "other";

            if (label.includes("rent")) {
                purpose = "rent";
            } else if (label.includes("sale")) {
                purpose = "buy";
            }

            return { type, purpose };
        }


        // Display the search results.
        function searchProperties(event) {

            if (event) {
                event.preventDefault();
            }

            const location = locationInput.value
                .trim()
                .toLowerCase();

            const selectedType = propertyType.value;
            const selectedPurpose = purposeSelect.value;

            let matches = 0;

            propertyCards.forEach(function (card) {

                const cardText = card.textContent.toLowerCase();
                const details = getPropertyDetails(card);

                const matchesLocation =
                    !location || cardText.includes(location);

                const matchesType =
                    !selectedType ||
                    details.type === selectedType;

                const matchesPurpose =
                    !selectedPurpose ||
                    details.purpose === selectedPurpose;

                const shouldDisplay =
                    matchesLocation &&
                    matchesType &&
                    matchesPurpose;

                card.hidden = !shouldDisplay;

                if (shouldDisplay) {
                    matches++;
                }

            });


            // Update the search results message.
            resultsMessage.replaceChildren();

            const message = document.createElement("p");
            message.className = "search-message";

            if (matches > 0) {

                message.textContent =
                    matches + (matches === 1
                        ? " property found."
                        : " properties found.");

            } else {

                message.textContent =
                    "No matching properties found. Try another location or search option.";

            }

            resultsMessage.appendChild(message);

            // Show the filtered listings.
            propertiesSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }


        // Run the search when the form is submitted.
        searchForm.addEventListener("submit", searchProperties);


        // Refilter when a selection changes, if a search is active.
        propertyType.addEventListener("change", function () {
            if (resultsMessage.hasChildNodes()) {
                searchProperties();
            }
        });

        purposeSelect.addEventListener("change", function () {
            if (resultsMessage.hasChildNodes()) {
                searchProperties();
            }
        });

    }


    // ---------- 3. Smooth Internal Navigation ----------

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // Keep the URL in sync with the section.
                if (window.location.hash !== targetId) {
                    history.replaceState(null, "", targetId);
                }
            }

        });

    });


    // ---------- 4. Property Enquiry Links ----------

    document.querySelectorAll(".property-btn").forEach(function (button) {

        button.addEventListener("click", function () {

            const card = button.closest(".property-card");

            if (!card) {
                return;
            }

            const propertyName =
                card.querySelector("h3")?.textContent || "Property";

            const propertyLocation =
                card.querySelector(".property-location")?.textContent || "";

            const enquirySection = document.getElementById("contact");

            if (enquirySection) {
                enquirySection.dataset.property = propertyName;

                // Display which property the visitor selected.
                let enquiryNotice =
                    enquirySection.querySelector(".enquiry-notice");

                if (!enquiryNotice) {
                    enquiryNotice = document.createElement("p");
                    enquiryNotice.className = "enquiry-notice";
                    enquiryNotice.setAttribute("role", "status");

                    const content =
                        enquirySection.querySelector(".cta-content");

                    if (content) {
                        content.insertBefore(
                            enquiryNotice,
                            content.querySelector(".primary-btn")
                        );
                    }
                }

                enquiryNotice.textContent =
                    "You selected: " + propertyName +
                    (propertyLocation ? " — " + propertyLocation : "") +
                    ". Contact us to enquire.";
            }

        });

    });


    // ---------- 5. Welcome Message in Console ----------

    console.log("ConnectHub website loaded successfully!");

});
