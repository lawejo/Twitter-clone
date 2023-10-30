"strict"
const feedBack = document.querySelector('#feed_back_modul_forgot_pw');
const overlayReset = document.querySelector("[data-name=overlay]");
async function resetPasswordEmail() {
    console.log('nithin')
    const frm = event.target // the form
    console.log(frm)
    const conn = await fetch("/api-reset-password-email", {
        method: "POST",
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
        console.log(overlayReset)
    }
    function displayErr() {

        console.log(overlayReset)
        feedBack.firstElementChild.innerHTML = "Error:";
        feedBack.classList.remove('hidden')
        feedBack.lastElementChild.innerHTML = data.errortype
        overlayReset.classList.remove('hidden')


    }

}

function handleOverlay() {
    feedBack.classList.add('hidden')
    overlayReset.classList.add('hidden')
}