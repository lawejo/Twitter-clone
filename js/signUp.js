"strict"
const feedBack = document.querySelector('#feed_back_modul');
const overlayReset = document.querySelector("[data-name=overlay-signup]");
async function submitSignUp() {

    const frm = event.target // the form
    const conn = await fetch("/api-sign-up", {
        method: "POST",
        body: new FormData(frm)
    })
    const data = await conn.json() // to get plain text

    frontPageButton = document.querySelector('#frontpage_button')

    data.info === 'ok' ? succes() : error();
    function succes() {

        console.log('Succes')
        feedBack.classList.remove('hidden')
        feedBack.firstElementChild.innerHTML = "Succes:";
        feedBack.lastElementChild.innerHTML = data.message;
        console.log(data.message)
        // Select all input fields, spread them and empty them
        inputFields = document.querySelectorAll('input');
        inputFieldsSpread = [...inputFields]
        inputFieldsSpread.map(input => input.value = '')
        // Remove submit button and show frontpage button
        frm.lastElementChild.classList.add('hidden')
        frontPageButton.classList.remove('hidden')
        overlayReset.classList.remove('hidden')


    }

    function error() {
        console.log('error')
        feedBack.firstElementChild.innerHTML = "Error:";
        feedBack.classList.remove('hidden')
        feedBack.lastElementChild.innerHTML = data.errortype
        overlayReset.classList.remove('hidden')



    }



};

function handleOverlaySignUp() {
    feedBack.classList.add('hidden')
    overlayReset.classList.add('hidden')
}



// function setDays() {
//     if (event.target.value % 2) {
//         document.querySelector("#day31").setAttribute("name", "user_birthday")
//         document.querySelector("#day30").setAttribute("name", "")
//         document.querySelector("#day31").style.display = "block"
//         document.querySelector("#day30").style.display = "none"
//     } else {
//         document.querySelector("#day30").setAttribute("name", "user_birthday")
//         document.querySelector("#day31").setAttribute("name", "1")
//         document.querySelector("#day30").style.display = "block"
//         document.querySelector("#day31").style.display = "none"
//     }
// }

// const selectYear = document.querySelector("#year");
// const selectDay31 = document.querySelector("#day31");
// const selectDay30 = document.querySelector("#day30");
// const currentYear = new Date().getFullYear();

// for (let i = 1924; i <= currentYear; i++) {
//     const option = document.createElement("option");
//     option.value = i;
//     option.text = i;
//     selectYear.add(option);
// }
// for (let i = 2; i <= 31; i++) {
//     const option = document.createElement("option");
//     option.value = i;
//     option.text = i;
//     selectDay31.add(option);
// }
// for (let i = 2; i <= 30; i++) {
//     const option = document.createElement("option");
//     option.value = i;
//     option.text = i;
//     selectDay30.add(option);
// }
