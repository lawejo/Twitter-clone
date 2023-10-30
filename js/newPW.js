"strict"
const feedBack = document.querySelector('#feed_back_modul_new_pw');
const overlayReset = document.querySelector("[data-name=overlay-newPW]");
async function resetPasswordNewPassword() {

    const frm = event.target // the form
    const conn = await fetch("/api-reset-password-new-password", {
        method: "PUT",
        body: new FormData(frm)
    })
    const data = await conn.json() // to get plain text
    console.log(data)
    data.info === "ok" ? succes() : displayErr()
    function succes() {
        feedBack.classList.remove('hidden')
        feedBack.firstElementChild.innerHTML = "Succes:";
        feedBack.lastElementChild.innerHTML = data.message;
        overlayReset.classList.remove('hidden')
    }
    function displayErr() {
        console.log(overlayReset)
        feedBack.firstElementChild.innerHTML = "Error:";
        feedBack.classList.remove('hidden')
        feedBack.lastElementChild.innerHTML = data.errortype
        overlayReset.classList.remove('hidden')


    }

}
function handleOverlayNewPw() {
    feedBack.classList.add('hidden')
    overlayReset.classList.add('hidden')
}