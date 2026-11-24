
// Activity 5: JavaScript Basics and User Interaction

// Reusable Toast Notification Function
function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";

        // Toast appearance
        toast.style.position = "fixed";
        toast.style.bottom = "30px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.backgroundColor = "#071b3a";
        toast.style.color = "white";
        toast.style.padding = "15px 25px";
        toast.style.borderRadius = "8px";
        toast.style.fontSize = "15px";
        toast.style.zIndex = "99999";
        toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
        toast.style.visibility = "hidden";
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.4s";

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


// Smooth Scrolling for Book Buttons
document.addEventListener("click", function (event) {

    const bookButton = event.target.closest('a[href="#booking"]');

    if (bookButton) {

        const bookingForm = document.getElementById("booking");

        if (bookingForm) {

            event.preventDefault();

            bookingForm.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            showToast("You are now viewing the ticket booking form!");
        }
    }
});

