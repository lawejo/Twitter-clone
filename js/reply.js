"use strict"

function handleReplyModal() {
    console.log(event.target.closest('form'))
    id = event.target.closest('form')[0].value; // Get the id for the tweet that is being replied to
    const modal = document.querySelector(`#replyModal_${id}`)
    modal.classList.contains('hidden') ? modal.classList.remove('hidden') : modal.classList.add('hidden')


}