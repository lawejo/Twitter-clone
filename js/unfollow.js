"use strict"
let parentElement = "";
let frmElement = "";
async function unfollow() {
    const frm = event.target // the form
    const conn = await fetch("/api-remove-follow", {
        method: "DELETE",
        body: new FormData(frm)
    })
    const data = await conn.json() // to get plain text
    const url = window.location.href
    const username = frm[0].value;
    const loc = frm.dataset.site;
    const urlUsername = url.substring(url.lastIndexOf("/") + 1);

    let site = "followbuttons_suggestions";
    let removeElement = "form";
    let datasite = "unf_suggestion";
    // Check if the profile page displayed and the user being followed is the same
    if (data.logged_user === urlUsername) {
        changeFollowingsMinus()
    }
    console.log(frm)
    console.log(username)
    console.log(urlUsername)
    if (username === urlUsername) {
        console.log('im here')
        site = "followbuttons_profile"
        removeElement = "unf_profile";
        let datasite = "unf_profile";
        changeFollowersMinus()
    }
    // First part of IF statement is if the unfollow is triggered from the tweet, ELSE part is if triggered from right hand suggestions
    if (frm.parentElement.tagName == "LI") {

        frmElement = frm.id
        parentElement = frm.parentElement.id

        const overlay = frm.closest("#tweet_modal_parent").nextElementSibling
        const tweetModalContent = frm.closest("ul").parentElement;


        document.querySelector(`#${frmElement}`).remove(); // Tweet remove
        const nodesListForm = document.querySelectorAll(`#${frmElement}`);
        const nodeSpreadForm = [...nodesListForm]
        nodeSpreadForm.map(node => node.remove())
        console.log(`#${username}_${removeElement}`)
        document.querySelector(`#${username}_${datasite}`).remove(); // Suggestion remove
        // Tweet button insert
        const nodesListParent = document.querySelectorAll(`#${parentElement}`);
        const nodeSpreadParent = [...nodesListParent];
        nodeSpreadParent.map(node => node.insertAdjacentHTML("afterbegin", `   <form method="POST" id="${username}_tweet_form"
                            onsubmit="follow(); return false">
                            <input id="followInput" style="display:none;" type="text" name="username"
                                value="${username}">
                            <button class="flex flex-row-reverse justify-end w-full" id="tweet_modal_follow">
                                Follow @${username}
                                <input style="display:none;" type="text" name="username"
                                    value="${username}">
                                <svg class="pointer-events-none mr-2" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"
                                    class="r-1nao33i r-4qtqp9 r-yyyyoo r-1q142lx r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
                                    width="24" height="24">
                                    <g fill="#E7E9EA">
                                        <path class=" pointer-events-none"
                                            d="M10 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM6 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4zm13 4v3h2v-3h3V8h-3V5h-2v3h-3v2h3zM3.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C13.318 13.65 11.838 13 10 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C5.627 11.85 7.648 11 10 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H1.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46z"
                                            fill="#E7E9EA"></path>
                                    </g>
                                </svg>
                            </button>
                        </form>
             `)


        )

        // Right hand button insert

        document.querySelector(`#${username}_${site}`).insertAdjacentHTML("afterbegin",
            ` <form method="POST" id="${username}_form" onsubmit="follow(); return false" data-site="${datasite}">
        <input id="followInput" style="display:none;" type="text" name="username"
            value="${username}" data-type="follow">
        <button
            class="transition ease-out w-[85px] h-[36px] bg-[#f5f7f8] hover:bg-[#d4d4d4] text-black rounded-full font-semibold text-[15px]">Follow</button>
    </form>
             `)

        tweetModalContent.classList.add('hidden');
        overlay.classList.add('hidden');
    } else {
        // Remove right hand suggestions button
        document.querySelector(`#${frmElement}`).remove();

        // Remove tweet buttons 
        const nodeListForm = document.querySelectorAll(`#${username}_tweet_form`);
        const nodeSpreadForm = [...nodeListForm]
        nodeSpreadForm.map(node => node.remove())
        // Insert button right hand suggestions
        document.querySelector(`#${parentElement}`).insertAdjacentHTML("afterbegin",
            ` <form method="POST" id="${username}_form" onsubmit="follow(); return false" data-site="${frm.dataset.site}">
        <input id="followInput" style="display:none;" type="text" name="username"
            value="${username}" data-type="follow">
        <button
            class="transition ease-out w-[85px] h-[36px] bg-[#f5f7f8] hover:bg-[#d4d4d4] text-black rounded-full font-semibold text-[15px]">Follow</button>
    </form>
             `)
        // Insert tweet button
        const nodeListParent = document.querySelectorAll(`#${username}_parent`);
        const nodeSpreadParent = [...nodeListParent];
        nodeSpreadParent.map(node => node.insertAdjacentHTML("afterbegin",
            `   <form method="POST" id="${username}_tweet_form"
                            onsubmit="follow(); return false">
                            <input id="followInput" style="display:none;" type="text" name="username"
                                value="${username}">
                            <button class="flex flex-row-reverse justify-end w-full" id="tweet_modal_follow">
                                Follow @${username}
                                <input style="display:none;" type="text" name="username"
                                    value="${username}">
                                <svg class="pointer-events-none mr-2" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"
                                    class="r-1nao33i r-4qtqp9 r-yyyyoo r-1q142lx r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
                                    width="24" height="24">
                                    <g fill="#E7E9EA">
                                        <path class=" pointer-events-none"
                                            d="M10 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM6 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4zm13 4v3h2v-3h3V8h-3V5h-2v3h-3v2h3zM3.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C13.318 13.65 11.838 13 10 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C5.627 11.85 7.648 11 10 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H1.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46z"
                                            fill="#E7E9EA"></path>
                                    </g>
                                </svg>
                            </button>
                        </form>
             `))

        unfollowModal(username, loc);
    }








    const profile_followers = document.querySelector("#profile_followers");


}

function unfollowModal(id, loc) {
    loc === "unf_profile" ? profile() : sugg(id);
    function profile() {
        console.log(`${id}_unf_profile`)
        frmElement = `${id}_unf_profile`;
        parentElement = `${id}_followbuttons_profile`;
        const modal_profile = document.querySelector("#unf_modal_profile")
        modal_profile.classList.contains('hidden') ? modal_profile.classList.remove("hidden") : modal_profile.classList.add("hidden")
    }
    function sugg(id) {
        frmElement = `${id}_unf_suggestion`;
        parentElement = `${id}_followbuttons_suggestions`;
        const modal_sugg = document.querySelector(`#${id}_unf_modal_suggestions`)
        modal_sugg.classList.contains('hidden') ? modal_sugg.classList.remove("hidden") : modal_sugg.classList.add("hidden")
    }




}

function changeFollowersMinus() {

    const profile_followers_count = document.querySelector("#profile_followers_count");
    const profFollNumber = parseInt(profile_followers_count.textContent, 16)
    console.log(profFollNumber)
    const plusOne = profFollNumber - 1;
    profile_followers_count.remove();

    document.querySelector(`#profile_followers`).insertAdjacentHTML("afterbegin",
        `    <span id="profile_followers_count" class="pr-1 text-white font-bold
                    ">${plusOne}
                  </span> `)
}

function changeFollowingsMinus() {
    const profile_following_count = document.querySelector("#profile_followers_count");
    const profFollNumber = parseInt(profile_followers_count.textContent, 16)
    const plusOne = profFollNumber - 1;
    profile_following_count.remove();

    document.querySelector(`#profile_following`).insertAdjacentHTML("afterbegin",
        `    <span id="profile_followers_count" class="pr-1 text-white font-bold
                    ">${plusOne}
                  </span> `)
}