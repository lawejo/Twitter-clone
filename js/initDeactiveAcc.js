"strict"
const feedBack = document.querySelector('#feed_back_modul_edit_profile');
const overlayReset = document.querySelector("[data-name=overlayDeactivate]");
const deleteAccModal = document.querySelector("#deleteAccChangesOverlay");
const succesFeedback = document.querySelector("#messageEdit")
const succesOverlay = document.querySelector("#editModalOverlay")
function deleteAccChangesModal() {
    console.log('we out here')
    deleteAccModal.classList.remove('hidden')
}

async function resetPasswordEmail() {
    const frm = event.target // the form
    console.log(frm)
    const conn = await fetch("deactivate-account", {
        method: "POST",
        body: new FormData(frm)
    })
    const data = await conn.json() // to get plain text
    console.log(data)
    data.info === "ok" ? succes() : displayErr()
    function succes() {
        console.log('SUCCES')
        deleteAccModal.classList.add('hidden')
        feedBack.classList.remove('hidden')
        feedBack.parentElement.style.zIndex = "1050";
        succesFeedback.firstElementChild.innerHTML = "Succes:";
        succesFeedback.lastElementChild.innerHTML = data.message;
        succesOverlay.classList.remove('hidden')
    }
    function displayErr() {
        console.log('YOUSE GOT AN ERRA')
        // console.log(overlayReset)
        // feedBack.firstElementChild.innerHTML = "Error:";
        // feedBack.classList.remove('hidden')
        // feedBack.lastElementChild.innerHTML = data.errortype
        // overlayReset.classList.remove('hidden')


    }


}

// function handleOverlayDeactive() {
//     feedBack.classList.add('hidden')
//     overlayReset.classList.add('hidden')
// }