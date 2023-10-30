"use strict"
async function follow() {
  const frm = event.target.closest('form') // the form
  const conn = await fetch("/api-follow", {
    method: "POST",
    body: new FormData(frm)
  })
  const data = await conn.json() // to get plain text
  console.log(data)

  const username = frm[0].value;
  const parentElement = frm.parentElement.id
  const url = window.location.href
  const urlUsername = url.substring(url.lastIndexOf("/") + 1);
  let site = "followbuttons_suggestions";
  let removeElement = "unf_suggestion";
  if (data.info === 'ok') {
    if (data.logged_user_username === urlUsername) {
      changeFollowing()
    }
    if (username === urlUsername && username.length > 0) {
      site = "followbuttons_profile";
      removeElement = "unf_profile";
      changeFollowersPlus()
    }


    if (frm.parentElement.tagName == "LI") {

      // overlay + tweetModalContent are necessary to hide the modal on the tweet after following
      const overlay = frm.closest("#tweet_modal_parent").nextElementSibling
      const tweetModalContent = frm.closest("ul").parentElement;

      document.querySelector(`#${username}_form`).remove(); // Remove right side suggestions button
      const nodesListForm = document.querySelectorAll(`#${username}_tweet_form`);     // Select all the buttons from tweets
      const nodeSpreadForm = [...nodesListForm] // Transform nodelist to array
      nodeSpreadForm.map(node => node.remove()) // Remove each instance of the specific form (from the tweets only)

      const nodesListParent = document.querySelectorAll(`#${parentElement}`);     // Remove button from the tweet

      const nodeSpreadParent = [...nodesListParent]
      nodeSpreadParent.map(node => node.insertAdjacentHTML("afterbegin",
        `  <form method="POST" id="${username}_tweet_form" onsubmit="unfollow(); return false">
                            <input id="followInput" style="display:none;" type="text" name="username"
                                value="${username}">
                            <button class="flex w-full" id="tweet_modal_unfollow">
                                <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24" aria-hidden="true"
                                 c=" ml-auto hover:text-sky-600 text-sm items-center hover:underline underline-offset-2 cursor-pointer hover:bg-twitterblue/[0.15] transition ease-in-out rounded-full h-fit"   class="r-1nao33i r-4qtqp9 r-yyyyoo r-1q142lx r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
                                    width="24" height="24">
                                    <g fill="#E7E9EA">
                                        <path
                                            d="M10 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM6 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4zm12.586 3l-2.043-2.04 1.414-1.42L20 7.59l2.043-2.05 1.414 1.42L21.414 9l2.043 2.04-1.414 1.42L20 10.41l-2.043 2.05-1.414-1.42L18.586 9zM3.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C13.318 13.65 11.838 13 10 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C5.627 11.85 7.648 11 10 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H1.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46z"
                                            fill="#E7E9EA"></path>
                                    </g>
                                </svg>

                                <p class="ml-2">Unfollow @${username}
                                 </p>
                             </button>
                         </form>`))
      //document.querySelector(`#${username}_${site}`)//
      document.querySelector(`#${username}_${site}`).insertAdjacentHTML("afterbegin",
        `    <button id="${username}_${removeElement}" onclick="unfollowModal(name, value)"
        name="${username}" value="${removeElement}"
        class="hover:after:content-['Unfollow'] hover:bg-[#f500005e]/[.15] hover:after:text-[#f4212e] hover:border-[#67070f] hover:before:content-none before:content-['Following']
                    transition ease-out ml-auto w-[85px] h-[36px] bg-inherit  text-white rounded-full font-semibold text-[15px] 
                    border-2 border-bordergray"></button>
     `
      )

      tweetModalContent.classList.add('hidden');
      overlay.classList.add('hidden');
    } else {
      document.querySelector(`#${frm.id}`).remove();
      const nodeListForm = document.querySelectorAll(`#${username}_tweet_form`);
      const nodeSpreadForm = [...nodeListForm]
      nodeSpreadForm.map(node => node.remove())
      document.querySelector(`#${parentElement}`).insertAdjacentHTML("afterbegin",
        `    <button id="${username}_${frm.dataset.site}" onclick="unfollowModal(name, value)"
        name="${username}" value="${removeElement}"
        class="hover:after:content-['Unfollow'] hover:bg-[#f500005e]/[.15] hover:after:text-[#f4212e] hover:border-[#67070f] hover:before:content-none before:content-['Following']
                    transition ease-out ml-auto w-[85px] h-[36px] bg-inherit  text-white rounded-full font-semibold text-[15px] 
                    border-2 border-bordergray"></button>
     `)
      const nodesListParent = document.querySelectorAll(`#${username}_parent`);
      const nodeSpreadParent = [...nodesListParent]
      nodeSpreadParent.map(node => node.insertAdjacentHTML("afterbegin",
        `  <form method="POST" id="${username}_tweet_form" onsubmit="unfollow(); return false">
                            <input id="followInput" style="display:none;" type="text" name="username"
                                value="${username}">
                            <button class="flex w-full" id="tweet_modal_unfollow">
                                <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24" aria-hidden="true"
                                    class="r-1nao33i r-4qtqp9 r-yyyyoo r-1q142lx r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
                                    width="24" height="24">
                                    <g fill="#E7E9EA">
                                        <path
                                            d="M10 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM6 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4zm12.586 3l-2.043-2.04 1.414-1.42L20 7.59l2.043-2.05 1.414 1.42L21.414 9l2.043 2.04-1.414 1.42L20 10.41l-2.043 2.05-1.414-1.42L18.586 9zM3.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C13.318 13.65 11.838 13 10 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C5.627 11.85 7.648 11 10 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H1.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46z"
                                            fill="#E7E9EA"></path>
                                    </g>
                                </svg>

                                <p class="ml-2">Unfollow @${username}
                                </p>
                            </button>
                        </form>`))
    }

  } else if (data.info === 'error') {
    document.querySelector('#login_notlogged').classList.remove('hidden')
  }
  function changeFollowersPlus() {
    const profile_followers_count = document.querySelector("#profile_followers_count");
    const profFollNumber = parseInt(profile_followers_count.textContent, 16)
    const plusOne = profFollNumber + 1;
    profile_followers_count.remove();
    document.querySelector(`#profile_followers`).insertAdjacentHTML("afterbegin",
      `    <span id="profile_followers_count" class="pr-1 text-white font-bold
    ">${plusOne}
    </span> `)
  }
  function changeFollowing() {
    const profile_following_count = document.querySelector("#profile_following_count");
    const profFollingNumber = parseInt(profile_following_count.textContent, 16)
    const plusOne = profFollingNumber + 1;
    profile_following_count.remove();
    document.querySelector(`#profile_following`).insertAdjacentHTML("afterbegin",
      `     <span id="profile_following_count" class="ml-3 pr-1 text-white font-bold
                    ">${plusOne}
    </span>`)
  }



}

function closeModalLoginSuggestion() {

  document.querySelector('#login_notlogged').classList.add('hidden')
}