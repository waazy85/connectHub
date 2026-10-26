```javascript
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const typeFilter = document.getElementById("type-filter");
const purposeFilter = document.getElementById("purpose-filter");

const propertyCards = document.querySelectorAll(".property-card");
const resultCount = document.getElementById("result-count");
const emptyMessage = document.getElementById("empty-message");

function filterProperties() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedType = typeFilter.value;
    const selectedPurpose = purposeFilter.value;

    let visibleCount = 0;

    propertyCards.forEach(function (card) {
        const name = card.dataset.name || "";
        const location = card.dataset.location || "";
        const type = card.dataset.type || "";
        const purpose = card.dataset.purpose || "";

        const matchesSearch =
            name.includes(searchTerm) ||
            location.includes(searchTerm);

        const matchesType =
            selectedType === "all" || type === selectedType;

        const matchesPurpose =
            selectedPurpose === "all" ||
            purpose === selectedPurpose;

        const isVisible =
            matchesSearch && matchesType && matchesPurpose;

        card.hidden = !isVisible;

        if (isVisible) {
            visibleCount++;
        }
    });

    resultCount.textContent =
        visibleCount + (visibleCount === 1 ? " property" : " properties");

    emptyMessage.hidden = visibleCount !== 0;
}

if (
    searchForm &&
    searchInput &&
    typeFilter &&
    purposeFilter &&
    resultCount &&
    emptyMessage
) {
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        filterProperties();
    });

    searchInput.addEventListener("input", filterProperties);
    typeFilter.addEventListener("change", filterProperties);
    purposeFilter.addEventListener("change", filterProperties);

    filterProperties();
} else {
    console.error(
        "Check that the HTML element IDs match the JavaScript IDs."
    );
}
```