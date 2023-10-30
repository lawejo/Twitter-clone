"use strict"
let retweetModalConst;
let id;
function handlRetweetModal() {

    event.target.nextElementSibling.classList.remove('hidden')
    retweetModalConst = event.target.nextElementSibling;
    event.target.nextElementSibling.style.zIndex = '1000';
    event.target.nextElementSibling.nextElementSibling.classList.remove('hidden')

}
function handleOverlayRetweet() {
    event.target.classList.add('hidden')
    event.target.previousElementSibling.classList.add('hidden')
}

function quoteRetweet() {

    id = event.target.closest('form')[0].value;
    const modal = document.querySelector(`#retweetQuoteModal_${id}`)
    modal.classList.remove('hidden')
    retweetModalConst.style.zIndex = '1';
}
function closeModal() {

    const modal = document.querySelector(`#retweetQuoteModal_${id}`)
    modal.classList.add('hidden')

    modal.previousElementSibling.classList.add('hidden')
    modal.previousElementSibling.previousElementSibling.classList.add('hidden')
}
