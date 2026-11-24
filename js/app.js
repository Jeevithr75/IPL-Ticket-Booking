
// Activity 5 and Activity 7
// IPL Ticket Booking Website

// Reusable Toast Notification Function
function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";

        toast.style.position = "fixed";
        toast.style.bottom = "30px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.backgroundColor = "#071b3a";
        toast.style.color = "white";
        toast.style.padding = "15px 25px";
        toast.style.borderRadius = "8px";
        toast.style.zIndex = "99999";
        toast.style.fontSize = "15px";

        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.visibility = "visible";
    toast.style.opacity = "1";

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(function () {
        toast.style.opacity = "0";
        toast.style.visibility = "hidden";
    }, 3000);
}


// Activity 5: Smooth Scrolling
document.addEventListener("click", function (event) {

    const bookButton = event.target.closest('a[href="#booking"]');

    if (bookButton) {

        const bookingSection = document.getElementById("booking");

        if (bookingSection) {
            event.preventDefault();

            bookingSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            showToast("You are now viewing the ticket booking form!");
        }
    }
});


// Activity 7: Live Booking Summary
document.addEventListener("DOMContentLoaded", function () {

    // Selecting form controls using DOM selectors
    const matchSelect = document.querySelector("#match");
    const standSelect = document.getElementById("stand");
    const quantityInput = document.getElementById("quantity");

    // Selecting Booking Summary elements
    const summaryMatch = document.getElementById("summaryMatch");
    const summaryStand = document.getElementById("summaryStand");
    const summaryPrice = document.getElementById("summaryPrice");
    const summaryQuantity = document.getElementById("summaryQuantity");
    const summaryTotal = document.getElementById("summaryTotal");

    // Ticket prices for each match and stand
    const ticketPrices = {
        "RCB vs CSK": {
            "General": 800,
            "Premium": 1500,
            "VIP": 3000
        },

        "RCB vs MI": {
            "General": 900,
            "Premium": 1800,
            "VIP": 3500
        },

        "MI vs KKR": {
            "General": 1000,
            "Premium": 2000,
            "VIP": 4000
        }
    };

    // Function to update Booking Summary
    function updateSummary() {

        const selectedMatch = matchSelect.value;
        const selectedStand = standSelect.value;

        let quantity = Number(quantityInput.value);

        if (!Number.isInteger(quantity) || quantity < 1) {
            quantity = 1;
            quantityInput.value = 1;
        }

        if (quantity > 10) {
            quantity = 10;
            quantityInput.value = 10;
        }

        const price = ticketPrices[selectedMatch][selectedStand];

        const total = price * quantity;

        // Display selected details
        summaryMatch.textContent = selectedMatch;
        summaryStand.textContent = selectedStand;
        summaryPrice.textContent = price;
        summaryQuantity.textContent = quantity;
        summaryTotal.textContent = total;

        showToast("Booking Summary Updated Successfully!");
    }

    // Change event listeners
    matchSelect.addEventListener("change", updateSummary);

    standSelect.addEventListener("change", updateSummary);

    quantityInput.addEventListener("change", updateSummary);

    // Initial summary calculation without notification
    function initializeSummary() {

        const selectedMatch = matchSelect.value;
        const selectedStand = standSelect.value;
        const quantity = Number(quantityInput.value);

        const price = ticketPrices[selectedMatch][selectedStand];

        summaryMatch.textContent = selectedMatch;
        summaryStand.textContent = selectedStand;
        summaryPrice.textContent = price;
        summaryQuantity.textContent = quantity;
        summaryTotal.textContent = price * quantity;
    }

    initializeSummary();

});
