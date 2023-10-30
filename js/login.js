"use strict"
const feedBackLogin = document.querySelector('#feed_back_modul_login')
const feedBackLoginMessage = document.querySelector('#message')
const modal = document.querySelector('#myModal');
const modalContent = document.querySelector('#modalContent');

async function login() {
    const frm = event.target // the form
    const conn = await fetch("/login", {
        method: "POST",
        body: new FormData(frm)
    })
    const data = await conn.json() // to get plain text
    data.info === "ok" ? loginSuccess() : displayErr()
    console.log(frm)
    console.log(data)
    function loginSuccess() {
        feedBackLogin.classList.remove('hidden')
        feedBackLoginMessage.firstElementChild.innerHTML = 'Succes:'
        feedBackLoginMessage.lastElementChild.innerHTML = data.message
        setTimeout(() => { location.href = `/` }, 1500)
    }
    function displayErr() {
        feedBackLogin.classList.remove('hidden')
        feedBackLoginMessage.firstElementChild.innerHTML = 'Error:'
        feedBackLoginMessage.firstElementChild.classList.add('text-red-900')
        feedBackLoginMessage.lastElementChild.innerHTML = data.errortype
        if (data.errortype.includes('verified')) {
            const a = document.createElement("a");
            a.classList.add('italic')
            a.classList.add('hover:underline')
            a.classList.add('font-bold')
            const link = document.createTextNode(" Complete verification")
            a.appendChild(link)
            a.href = "/verification"
            console.log(feedBackLogin.lastElementChild)
            feedBackLoginMessage.lastElementChild.appendChild(a)
        }
    }

}
function closeModalLogin() {
    modal.classList.add('hidden')
}
function showModal() {
    modal.classList.remove('hidden')
}