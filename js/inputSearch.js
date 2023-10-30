"use strict"
// // #TODO: Create snippet for function
const searchTwitter = document.querySelector("#search-twitter");
const searchModal = document.querySelector("#searchModal");
const searchOverlay = document.querySelector("#searchOverlay");





searchTwitter.addEventListener("focus", () => {
  searchModal.classList.remove("hidden");
  searchModal.style.zIndex = '1001';
  searchOverlay.classList.remove("hidden");
})
function closeSearchOverlay() {
  searchOverlay.classList.add('hidden')
  searchModal.classList.add('hidden')
}

let the_timer
function search() {
  const frm = event.target.closest('form')

  clearTimeout(the_timer)
  the_timer = setTimeout(async () => {
    const conn = await fetch("/api-search", {
      method: "POST",
      body: new FormData(frm)
    })
    const data = await conn.json()
    const search_results = data.message
    console.log(data)
    let results = ""
    document.querySelector("#searchModal").innerHTML = '';

    search_results.forEach((user) => {
      console.log(user)
      results +=
        `${user.user_id ? `<div class="flex items-center px-2 my-2 hover:bg-fadedhover transition ease-in-out min-h-[72px]">
              <a class="flex text-fif cursor-pointer items-center  mr-auto ml-22 "
                href="${user.user_username}">
                <div class="w-[48px] h-[48px] overflow-hidden flex justify-center items-center rounded-full mr-2">
                  ${user.user_avatar === null ? `<img src="../images/default_avatar.png" class="" alt="">` : `<img src="images/${user.user_avatar}" class="" alt="">`}
                  
                </div>

                <div class="">

                  <p class="sm font-semibold hover:underline hover:underline-offset-2 decoration-1">
                    ${user.user_first_name}
                    ${user.user_last_name ? user.user_last_name : ""}
                  </p>
                  <p class="text-fadedheadline font-semibold text-xs">@${user.user_username}</p>
                </div>
              </a>
            </div>`



          :




          `<div class="flex items-center px-2 my-2 hover:bg-fadedhover transition ease-in-out min-h-[72px]">
              <a class="flex text-fif cursor-pointer items-center  mr-auto ml-22 "
                href="${user.user_username}">
                

                <div class="">
                <p class="text-fadedheadline font-semibold text-xs">${user.trend_location}</p>    

                  <p class="sm font-semibold hover:underline hover:underline-offset-2 decoration-1">
                    ${user.trend_topic}
                    
                  </p>
                </div>
              </a>
            </div>`}`
    })
    document.querySelector("#searchModal").insertAdjacentHTML('afterbegin', results)
  }, 1000)


}