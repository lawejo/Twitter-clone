"use strict"

async function deleteTweet() {
    const frm = event.target.closest('form') // the form
    const target = event.target.closest('#tweet')
    const conn = await fetch("/api-delete-tweet", {
        method: "DELETE",
        body: new FormData(frm)
    })
    const data = await conn.json() // to get plain text
    console.log(data)
    target.parentElement.remove();
}

function handleTweetModal() {
    let overlayModal;
    let tweetModal;
    // Determine if the function is called from the ellipses SVG or the overlay
    // event.target.tagName == 'svg' ? overlayModal = event.target.closest('#tweet_modal_parent').nextElementSibling : overlayModal = event.target;
    event.target.dataset.name == 'tweetmodal' ? overlayModal = event.target.parentElement.nextElementSibling : overlayModal = event.target

    event.target.dataset.name == 'tweetmodal' ? tweetModal = event.target.nextElementSibling : tweetModal = event.target.previousElementSibling.lastElementChild

    // event.target.tagName == 'svg' ? tweetModal = event.target.parentElement.nextElementSibling : tweetModal = event.target.nextElementSibling;

    // Reveal modal content
    tweetModal.classList.contains('hidden') ? tweetModal.classList.remove('hidden') : tweetModal.classList.add('hidden')
    // Reveal modal overlay
    overlayModal.classList.contains('hidden') ? overlayModal.classList.remove('hidden') : overlayModal.classList.add('hidden')

    // Increaze Z-index 
    tweetModal.classList.contains('hidden') ? tweetModal.style.zIndex = '10' : tweetModal.style.zIndex = '1001'
    overlayModal.classList.contains('hidden') ? overlayModal.style.zIndex = '10' : overlayModal.style.zIndex = '1000'
}

