
// DISPLAY TOAST MESSAGE

function showToast(message) {
    const oldToast = document.querySelector(".toast");

    if (oldToast) {
        oldToast.remove();
    }

    const toast = document.createElement("div");

    toast.className = "toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}


// BOOKING FORM ELEMENTS

const bookingForm = document.getElementById("booking-form");

const matchSelect = document.getElementById("match");
const standSelect = document.getElementById("stand");
const ticketInput = document.getElementById("tickets");

const summaryMatch = document.getElementById("summary-match");
const summaryStand = document.getElementById("summary-stand");
const summaryPrice = document.getElementById("summary-price");
const summaryQuantity = document.getElementById("summary-quantity");
const summaryTotal = document.getElementById("summary-total");


// UPDATE BOOKING SUMMARY

function updateBookingSummary() {

    if (!matchSelect || !standSelect || !ticketInput) {
        return;
    }

    const match = matchSelect.value;
    const stand = standSelect.value;
    const quantity = Number(ticketInput.value) || 0;

    const prices = {
        General: 800,
        Premium: 1500,
        VIP: 3000
    };

    const price = prices[stand] || 0;
    const total = price * quantity;

    summaryMatch.textContent = match || "Not selected";
    summaryStand.textContent = stand || "Not selected";
    summaryPrice.textContent = "₹" + price;
    summaryQuantity.textContent = quantity;
    summaryTotal.textContent = "₹" + total;
}


// BOOKING FORM EVENTS

if (bookingForm) {

    if (window.location.hash === "#booking-form") {

        setTimeout(() => {
            bookingForm.scrollIntoView({
                behavior: "smooth"
            });
        }, 100);

        showToast("Ready to book your IPL tickets!");
    }

    matchSelect.addEventListener("change", updateBookingSummary);

    standSelect.addEventListener("change", updateBookingSummary);

    ticketInput.addEventListener("input", updateBookingSummary);


    // SUBMIT BOOKING

    bookingForm.addEventListener("submit", function(event) {

        event.preventDefault();

        updateBookingSummary();

        showToast("Booking submitted successfully!");

    });


    // RESET BOOKING FORM

    bookingForm.addEventListener("reset", function() {

        setTimeout(() => {

            updateBookingSummary();

            showToast("Booking form has been reset!");

        }, 0);

    });

}


// MATCH FILTER

const teamFilter = document.getElementById("team");

const matchCards = document.querySelectorAll(".match-card");

if (teamFilter) {

    teamFilter.addEventListener("change", function() {

        const selectedTeam = teamFilter.value;

        matchCards.forEach(function(card) {

            const teams = card.dataset.teams.split(" ");

            if (
                selectedTeam === "All" ||
                teams.includes(selectedTeam)
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

        showToast("Match filter updated!");

    });

}


// DAY VIEW AND LIST VIEW

const matchContainer = document.getElementById("match-container");

const gridButton = document.getElementById("grid-view");

const listButton = document.getElementById("list-view");

if (matchContainer && gridButton && listButton) {

    // DAY VIEW

    gridButton.addEventListener("click", function() {

        matchContainer.classList.remove("list-view");

        showToast("Day view selected!");

    });


    // LIST VIEW

    listButton.addEventListener("click", function() {

        matchContainer.classList.add("list-view");

        showToast("List view selected!");

    });

}


// MOBILE NAVIGATION MENU

const menuToggle = document.getElementById("menu-toggle");

const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", function() {

        navbar.classList.toggle("active");

        showToast("Navigation menu toggled!");

    });


    navbar.querySelectorAll("a").forEach(function(link) {

        link.addEventListener("click", function() {

            navbar.classList.remove("active");

        });

    });

}
