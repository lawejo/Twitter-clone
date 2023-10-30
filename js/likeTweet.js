"use strict"

async function likeTweet() {
    const frm = event.target // the form

    const conn = await fetch("/api-like-tweet", {
        method: "POST",
        body: new FormData(frm)
    })
    const data = await conn.json() // to get plain text
    const username = frm[0].dataset.username;
    const tweetID = frm[0].value
    console.log(frm)
    const amount = frm[1].lastElementChild.innerText;
    let newAmount;
    amount == "0" ? newAmount = 1 : newAmount = +amount + 1;

    document.querySelector(`#${frm.id}`).remove();
    document.querySelector(`#tweet_likey_${tweetID}`).insertAdjacentHTML("afterbegin",
        `      <form onsubmit="removeLikeTweet(); return false" id="dislike_${tweetID}_removeLike">
        <input style="display:none;" type="text" name="tweet_fk" value="${tweetID}"
            data-username="${username}">
        <button class=" flex items-center hover cursor-pointer group">
            <span class="group-hover:bg-pink-600/[0.15] transition ease-in-out rounded-full p-2">
                <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    aria-hidden="true"
                    class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi" width="24"
                    height="24">
                    <g fill="#F91880">
                        <path
                            d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
                            fill="#F91880"></path>
                    </g>
                </svg>
            </span>
            <span class="text-sm text-gray-500 group-hover:text-pink-600 transition ease-in-out" id="amount">
                ${newAmount}
            </span>
        </button>
    </form> `)
}