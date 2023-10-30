"use strict"

const logoutModal = document.querySelector("#modalLogout");
const logoutOverlay = document.querySelector("[data-name=overlay]");
function handleLogoutModal() {
    if (event.target.nodeName === "A") {
        window.location.href = "/logout";
    }
    logoutModal.classList.contains('hidden') ? revealModal() : hideModal()

    function revealModal() {
        logoutModal.classList.remove('hidden')
        logoutOverlay.classList.remove('hidden')
    }
    function hideModal() {
        logoutModal.classList.add('hidden')
        logoutOverlay.classList.add('hidden')
    }
}


