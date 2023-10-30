"use strict"

function notLoggedFollowModal() {
    console.log(event.target)
    document.querySelector('#login_notlogged').classList.add('hidden')
    document.querySelector('#myModal').classList.remove('hidden')
}