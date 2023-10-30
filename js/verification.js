"use strict"
const feedbackModul = document.querySelector("#feed_back_modul_verification")
async function verification() {
    const frm = event.target // the form
    const conn = await fetch("/api-verification", {
        method: "POST",
        body: new FormData(frm)
    })
    const data = await conn.json() // to get plain text
    console.log(data)

    data.info === 'ok' ? succes() : error();
    function succes() {

        console.log('Succes')
        feedbackModul.classList.remove('hidden')
        feedbackModul.firstElementChild.innerHTML = "Succes:";
        feedbackModul.lastElementChild.innerHTML = data.message;
        console.log(feedbackModul)
        setTimeout(() => { location.href = `/` }, 2000)

    }

    function error() {
        console.log('error')
        feedbackModul.firstElementChild.innerHTML = "Error:";
        feedbackModul.classList.remove('hidden')
        feedbackModul.lastElementChild.innerHTML = data.errortype

    }
}
