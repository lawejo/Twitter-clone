"use strict"
const output = document.querySelector('#output');
const closeButton = document.querySelector("#closeButton");
const tweetInput = document.querySelector('#tweet_input');
const tweetButton = document.querySelector("#tweet_button");


async function tweet() {
    const frm = event.target // the form
    const conn = await fetch("/tweet", {
        method: "POST",
        body: new FormData(frm)
    })

    const data = await conn.json() // to get plain text
    console.log(data)
    const user = data.user
    const tweet = data.tweet
    const retweet = data.retweet
    const secondRetweet = data.second_retweet
    const thirdRetweet = data.third_retweet
    console.log(tweet.tweet_total_retweets);

    const url = window.location.href
    const urlUsername = url.substring(url.lastIndexOf("/") + 1);
    if (urlUsername.length > 0) {
        // Select all retweetOption modals
        const allRetweetOptionsModals = document.querySelectorAll('.retweetModal')
        let currenModal = {};
        const optionsSpread = [...allRetweetOptionsModals]
        // Finding the one that is currently missing the hidden class
        optionsSpread.map(node => !node.classList.contains('hidden') ? currenModal = node : "");
        currenModal.classList.add('hidden');
        // Adding hidden to the overlay modal
        currenModal.nextElementSibling.classList.add('hidden');
        return
    }

    console.log(user)



    let message = ""
    retweet !== null ? message = retweet.tweet_message : message = frm.querySelector("input[name='message']").value




    if (retweet == null) {
        console.log(`Normal tweet`);


        document.querySelector("#tweets").insertAdjacentHTML("afterbegin", `
        <div class="border-t border-bordergray pr-4">
       <div class="w-contain flex" id="tweet">
        <!-- left -->

        <div class=" flex flex-col w-fit md:w-fit p-2 items-center ml-2 mr-2">
            <a href="${user.user_username}" class="w-[48px] h-[48px]">
                <img src="../images/${user.user_avatar}" class="rounded-full" alt="" />
            </a>

        </div>
        <!-- right -->
        <!-- I need to loop through the tweets to know if there is a reply or not - Inside the if I need to check if
                      the tweet has a reply and if it has a reply through the replies. The code should be in place on render_profile.py -->
        <form id="tweet_message_form">
            <div class="flex flex-wrap mt-4 md:mt-2 w-full lg:pr-4">

                <!-- Tweet form w. message +  -->

                <input style="display:none;" type="text" name="tweet_id" value="${tweet.tweet_id}">
                <div class="flex flex-col w-full">
                    <div class="flex">
                        <p class="flex  w-full text-fif font-semibold">
                            <a href="${user.user_username}">

                                ${user.user_first_name} ${user.user_last_name ? user.user_last_name : ""}
                            </a>
                            <span class="flex items-center">

                                <span
                                    class="flex cursor-pointer font-semibold text-slate-200 text-base hover:underline underline-offset-2">


                                    ${user.user_total_followers >= 2 ? `<span class="flex items-center pl-1 -mr-1">

                                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24" aria-label="Verified account" role="img"
                                            class="r-1cvl2hr r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr"
                                            data-testid="icon-verified" width="20" height="20">
                                            <g fill="#1D9BF0">
                                                <path
                                                    d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"
                                                    fill="#1D9BF0"></path>
                                            </g>
                                        </svg>
                                    </span>` : ""}
                                    




                                </span>

                                <a href="${user.user_username}"> 
                                <span class="text-sm flex items-center text-gray-500 ml-2">
                                        <strong>@</strong>
                                        ${user.user_username} <span class="mx-1">·</span>
                                        Now
                                    </span></a>

                            </span>

                            <!-- Tweet modal / logged in user -->





                    </div>
                    </p>
                    <p class="flex flex-wrap text-base">
                        <span>${tweet.tweet_message} </span>
                    </p>
                  ${tweet.tweet_image ? `<p class="w-full mt-2">
        <img src="../images/${tweet.tweet_image}" class="rounded-xl" alt="">
    </p>` : ""}
                </div>
    </form>
                <!-- Icons -->
                <div class="flex w-full justify-between lg:-ml-2 mt-2 text-gray-700 lg:pr-6 pb-2">
                    
                    <div class="flex items-center cursor-pointer group">
                        <span class="group-hover:bg-twitterblue/[0.15] transition ease-in-out rounded-full p-2">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24" aria-hidden="true"
                                class="fill-gray-500 group-hover:fill-bg-twitterblue transition ease-in-out r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
                                width="20" height="20">
                                <g>
                                    <path
                                        d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z">
                                    </path>
                                </g>
                            </svg>
                        </span>

                        <span
                            class="text-sm text-gray-500 group-hover:text-bg-twitterblue transition ease-in-out">989</span>
                    </div>


                    <div class="flex items-center cursor-pointer group">

                        ${tweet.tweet_role === '2' ? `       <span class="group-hover:bg-twitterblue/[0.15] transition ease-in-out rounded-full p-2">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24" aria-hidden="true"
                                class="fill-[#00BA7C] group-hover:fill-emerald-500 transition ease-in-outr-1bwzh9t r-4qtqp9 r-yyyyoo r-10ptun7 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1janqcz"
                                width="20" height="20">
                                <g>
                                    <path
                                        d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z">
                                    </path>
                                </g>
                            </svg>
                        </span>

                        <span class="text-sm text-[#00BA7C] group-hover:text-emerald-500 transition ease-in-out">${tweet.tweet_total_retweets}</span>` : `
                        
                               <span class="group-hover:bg-twitterblue/[0.15] transition ease-in-out rounded-full p-2">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24" aria-hidden="true"
                                class="fill-gray-500 group-hover:fill-emerald-500 transition ease-in-outr-1bwzh9t r-4qtqp9 r-yyyyoo r-10ptun7 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1janqcz"
                                width="20" height="20">
                                <g>
                                    <path
                                        d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z">
                                    </path>
                                </g>
                            </svg>
                        </span>

                        <span class="text-sm text-gray-500 group-hover:text-emerald-500 transition ease-in-out">${tweet.tweet_total_retweets}</span>
                        
                        `}
                 
                    </div>


                    <div id="tweet_likey_${tweet.tweet_id}">

                      <form onsubmit="likeTweet(); return false" id="like_${tweet.tweet_id}">
            <input style="display:none;" type="text" name="tweet_fk" value="${tweet.tweet_id}"
                data-username="${user.user_username}">
            <button class=" flex items-center hover cursor-pointer group">
                <span class="group-hover:bg-pink-600/[0.15] transition ease-in-out rounded-full p-2">
                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        aria-hidden="true"
                        class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi" width="24"
                        height="24">
                        <g fill="#71767B">
                            <path
                                d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
                                fill="#71767B"></path>
                        </g>
                    </svg>
                </span>
                <span class="text-sm text-gray-500 group-hover:text-pink-600 transition ease-in-out">
                    0
                </span>
            </button>
        </form>
    </div>


                    <div class="hidden sm:flex items-center cursor-pointer group">
                        <span class="group-hover:bg-twitterblue/[0.15] transition ease-in-out rounded-full p-2">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24" strok aria-hidden="true"
                                class="fill-gray-500 group-hover:fill-bg-twitterblue transition ease-in-out r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
                                width="20" height="20">
                                <g>
                                    <path
                                        d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z">
                                    </path>
                                </g>
                            </svg>
                        </span>
                        <span
                            class="pl-2 text-sm text-gray-500 group-hover:text-bg-twitterblue transition ease-in-out">3.4M</span>
                    </div>


                    <div class="flex items-center cursor-pointer group">
                        <span class="group-hover:bg-twitterblue/[0.15] transition ease-in-out rounded-full p-2">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24" aria-hidden="true"
                                class="fill-gray-500 group-hover:fill-bg-twitterblue transition ease-in-out r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
                                width="20" height="20">
                                <g>
                                    <path
                                        d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z">
                                    </path>
                                </g>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>

        <div>
            <div class="relative" id="tweet_modal_parent">
                <div onclick="handleTweetModal()"
                    class=" ml-auto hover:text-sky-600 text-sm items-center hover:underline underline-offset-2 cursor-pointer hover:bg-twitterblue/[0.15] transition ease-in-out rounded-full h-fit" value="ellipses" data-name="tweetmodal">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor"
                        class="pointer-events-none w-6 h-6 rotate-90 cursor-pointer group-hover:stroke-bg-twitterblue transition ease-in-out z-10">
                        <path class=" pointer-events-none" stroke-linecap="round" stroke-linejoin="round"
                            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>

                </div>
                <!-- Tweet Modal content -->
                <div class="hidden absolute top-0 right-0 mt-6 w-[310px] bg-black shadow-[0_0px_15px_1px_rgba(255,255,255,0.3)] rounded-xl"
                    class="modalTweet">
                    <!-- Button for logged users -->
                    <ul class="py-2 px-4">
                        <li class="text-[#F4212E] text-[15px font-semibold ">
                            <form>
                                <button class="flex w-full" onclick="deleteTweet(); return false" value="${tweet.tweet_id}">

                                    <svg class="pointer-events-none" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"
                                        class="r-9l7dzd r-4qtqp9 r-yyyyoo r-1q142lx r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
                                        width="24" height="24">
                                        <g fill="#F4212E">
                                            <path
                                                d="M16 6V4.5C16 3.12 14.88 2 13.5 2h-3C9.11 2 8 3.12 8 4.5V6H3v2h1.06l.81 11.21C4.98 20.78 6.28 22 7.86 22h8.27c1.58 0 2.88-1.22 3-2.79L19.93 8H21V6h-5zm-6-1.5c0-.28.22-.5.5-.5h3c.27 0 .5.22.5.5V6h-4V4.5zm7.13 14.57c-.04.52-.47.93-1 .93H7.86c-.53 0-.96-.41-1-.93L6.07 8h11.85l-.79 11.07zM9 17v-6h2v6H9zm4 0v-6h2v6h-2z"
                                                fill="#F4212E"></path>
                                        </g>
                                    </svg>

                                    <p class="ml-2 pointer-events-none">Delete</p>

                                </button>
                            </form>
                        </li>
                    </ul>


                        </li>
                    </ul>

                </div>
                <!-- Tweet Overlay modal -->
            </div>
            <div class="hidden fixed  top-0 left-0 w-full h-full bg-white opacity-0" onclick="handleTweetModal()">
            </div>
        </div>
    </div>
    </div>
                  `)
    } else if (retweet !== null && tweet.tweet_message === '') {

        document.querySelector("#tweets").insertAdjacentHTML("afterbegin", `
        <div class="border-t border-bordergray pr-4">
        <p class=" ml-[65px] flex items-center text-[13px] text-gray-500 font-bold">
        <span class="mr-2">
        <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        aria-hidden="true"
        class="r-1bwzh9t r-4qtqp9 r-yyyyoo r-10ptun7 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1janqcz" width="16"
        height="16">
        <g fill="#71767B">
        <path
        d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"
        fill="#71767B"></path>
        </g>
        </svg>
        </span>
        <span class="mr-1">
        You
        </span>
        Retweeted
        </p>
       <div class="w-contain flex" id="tweet">
        <!-- left -->

        <div class=" flex flex-col w-fit md:w-fit p-2 items-center ml-2 mr-2">
        <a href="${retweet.user_username}" class="w-[48px] h-[48px]">
        <img src="../images/${retweet.user_avatar}" class="rounded-full" alt="" />
        </a>
        
        </div>
        <!-- right -->
        <!-- I need to loop through the tweets to know if there is a reply or not - Inside the if I need to check if
        the tweet has a reply and if it has a reply through the replies. The code should be in place on render_profile.py -->
        <form id="tweet_message_form">
            <div class="flex flex-wrap mt-4 md:mt-2 w-full lg:pr-4">
            
            <!-- Tweet form w. message +  -->
            
            <input style="display:none;" type="text" name="tweet_id" value="${tweet.tweet_id}">
            <div class="flex flex-col w-full">
            
            <div class="flex mr-4">

            <p class="flex w-full text-fif font-semibold">
            <a href="${retweet.user_username}">
            
            ${retweet.user_first_name} ${retweet.user_last_name ? retweet.user_last_name : ""}
            </a>
            <span class="flex items-center">
            ${user.user_total_followers >= 2 ? ` <span
            class="flex cursor-pointer font-semibold text-slate-200 text-base hover:underline underline-offset-2">
            
            <span class="flex items-center px-1">
            
            <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24" aria-label="Verified account" role="img"
            class="r-1cvl2hr r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr"
            data-testid="icon-verified" width="20" height="20">
            <g fill="#1D9BF0">
                                                <path
                                                d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"
                                                fill="#1D9BF0"></path>
                                            </g>
                                        </svg>
                                    </span>
                                    </span>` : ``}

                                    <a href="${retweet.user_username}"> <span class="text-sm flex items-center text-gray-500 ml-2">
                                        <strong>@</strong>
                                        ${retweet.user_username} <span class="mx-1">·</span>
                                        Now
                                        </span>
                                        </a>

                                        </span>
                    </p>
                                                 <div>
                                        <div class="relative" id="tweet_modal_parent">
                                        <div onclick="handleTweetModal()"
                    class=" ml-auto hover:text-sky-600 text-sm items-center hover:underline underline-offset-2 cursor-pointer hover:bg-twitterblue/[0.15] transition ease-in-out rounded-full h-fit" value="ellipses" data-name="tweetmodal">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor"
                    class="pointer-events-none w-6 h-6 rotate-90 cursor-pointer group-hover:stroke-bg-twitterblue transition ease-in-out z-10">
                    <path class=" pointer-events-none" stroke-linecap="round" stroke-linejoin="round"
                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                    
                    </div>
                    <!-- Tweet Modal content -->
                    <div class="hidden absolute top-0 right-0 mt-6 w-[310px] bg-black shadow-[0_0px_15px_1px_rgba(255,255,255,0.3)] rounded-xl"
                    class="modalTweet">
                    <!-- Button for logged users -->
                    <ul class="py-2 px-4">
                    <li class="text-[#F4212E] text-[15px font-semibold ">
                    <form>
                    <button class="flex w-full" onclick="deleteTweet(); return false">
                    
                    <svg class="pointer-events-none" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"
                                        class="r-9l7dzd r-4qtqp9 r-yyyyoo r-1q142lx r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
                                        width="24" height="24">
                                        <g fill="#F4212E">
                                        <path
                                        d="M16 6V4.5C16 3.12 14.88 2 13.5 2h-3C9.11 2 8 3.12 8 4.5V6H3v2h1.06l.81 11.21C4.98 20.78 6.28 22 7.86 22h8.27c1.58 0 2.88-1.22 3-2.79L19.93 8H21V6h-5zm-6-1.5c0-.28.22-.5.5-.5h3c.27 0 .5.22.5.5V6h-4V4.5zm7.13 14.57c-.04.52-.47.93-1 .93H7.86c-.53 0-.96-.41-1-.93L6.07 8h11.85l-.79 11.07zM9 17v-6h2v6H9zm4 0v-6h2v6h-2z"
                                                fill="#F4212E"></path>
                                                </g>
                                                </svg>
                                                
                                                <p class="ml-2 pointer-events-none">Delete</p>

                                </button>
                                </form>
                                </li>
                                </ul>
                                
                                
                                </li>
                                </ul>

                                </div>
                                <!-- Tweet Overlay modal -->
                                </div>
                                <div class="hidden fixed  top-0 left-0 w-full h-full bg-white opacity-0" onclick="handleTweetModal()">
            </div>
            </div>
                                        </div>
                                        
                                        
                                        <p class="flex flex-wrap text-base">
                        <span>${retweet.tweet_message} </span>
                    </p>
                  ${retweet.tweet_image ? `<p class="w-full mt-2">
        <img src="../images/${retweet.tweet_image}" class="rounded-xl" alt="">
        </p>` : ""}
        </div>
    </form>



        ${secondRetweet ? `
   <div class="w-[505px] border border-bordergray rounded-lg text-white mt-4">
                                    <div class="w-contain flex" id="tweet">


                                     
                                   
                                        <div class="flex flex-wrap mt-4 md:mt-2 w-full = h-full">
                                       
                                            <div class="flex flex-col w-full">

                                                <div class="flex items-center ml-2 p-1">
                                                    <div
                                                        class="w-[20px] h-[20px] tweet_img_parent overflow-hidden rounded-full flex justify-center items-center mr-2">
                                                        <a href="/${secondRetweet.user_username}"
                                                            class="w-full h-full flex justify-center items-center">
                                                            ${secondRetweet.user_avatar ? ` <img src="../images/${secondRetweet.user_avatar}"
                                                                alt="" />`: ` <img src="../images/../images/default_avatar.png"
                                                                alt="" />`}
                                                        </a>
                                                    </div>
                                                    <p class="flex  w-full text-fif font-semibold">
                                                        <a href="${secondRetweet.user_username}">

                                                            ${secondRetweet.user_first_name}
                                                         
                                                            ${secondRetweet.user_last_name}
                                                            
                                                        </a>
                                                        <span class="flex items-center">

                                                           ${secondRetweet.user_total_followers >= 2 ? ` <span
                                                                class="flex cursor-pointer font-semibold text-slate-200 text-base hover:underline underline-offset-2">

                                                                <span class="flex items-center px-1">

                                                                    <svg xmlns:xlink="http://www.w3.org/1999/xlink"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 24 24"
                                                                        aria-label="Verified account" role="img"
                                                                        class="r-1cvl2hr r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr"
                                                                        data-testid="icon-verified" width="20"
                                                                        height="20">
                                                                        <g fill="#1D9BF0">
                                                                            <path
                                                                                d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"
                                                                                fill="#1D9BF0"></path>
                                                                        </g>
                                                                    </svg>
                                                                </span>
                                                            </span>`: ``}

                                                            <a href="${secondRetweet.user_username}"> <span
                                                                    class="text-sm flex items-center text-gray-500 ml-2">
                                                                    <strong>@</strong>
                                                                    ${secondRetweet.user_username} <span
                                                                        class="mx-1">·</span>
                                                                    ${secondRetweet.tweet_since_created}
                                                                </span>
                                                       
                                                            </a>
  





                                                </div>
                                                </p>
                                                <p class="flex flex-wrap text-base ml-2">
                                                ${tweet.tweet_message ? `<span>${secondRetweet.tweet_message}</span>` : `<span>${secondRetweet.retweet_tweet_message}</span>`}
                                                
                                                    
                                                    ${thirdRetweet ? ` <span
                                                        class="ml-1">twitter.com/${thirdRetweet.user_username}/stat…
                                                    </span>` : ``}              

                                          

                                                </p>
                                                ${secondRetweet.tweet_image ? ` <p class="w-full mt-2">
                                                    <img src="../images/{{tweet['retweet_image']}}" class="rounded-xl"
                                                        alt="" name="tweetIMG">
                                                </p>`: ""}
                                               
                                            </div>


                                        </div>
                                    </div>
                                </div>`: ``}






    <!-- Icons -->
    <div class="flex w-full justify-between lg:-ml-2 mt-2 text-gray-700 lg:pr-6 pb-2">
                    
    <div class="flex items-center cursor-pointer group">
    <span class="group-hover:bg-twitterblue/[0.15] transition ease-in-out rounded-full p-2">
    <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24" aria-hidden="true"
    class="fill-gray-500 group-hover:fill-bg-twitterblue transition ease-in-out r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
                                width="20" height="20">
                                <g>
                                <path
                                        d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z">
                                        </path>
                                </g>
                                </svg>
                        </span>
                        
                        <span
                        class="text-sm text-gray-500 group-hover:text-bg-twitterblue transition ease-in-out">989</span>
                        </div>
                        
                        
                        <div class="flex items-center cursor-pointer group">
                        
                        ${tweet.tweet_role === '2' ? `       <span class="group-hover:bg-twitterblue/[0.15] transition ease-in-out rounded-full p-2">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24" aria-hidden="true"
                                class="fill-[#00BA7C] group-hover:fill-emerald-500 transition ease-in-outr-1bwzh9t r-4qtqp9 r-yyyyoo r-10ptun7 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1janqcz"
                                width="20" height="20">
                                <g>
                                <path
                                        d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z">
                                    </path>
                                    </g>
                                    </svg>
                                    </span>

                                    <span class="text-sm text-[#00BA7C] group-hover:text-emerald-500 transition ease-in-out">${tweet.tweet_total_retweets === 0 ? 1 : `${tweet.tweet_total_retweets + 1}`}</span>` : `
                                    
                                    <span class="group-hover:bg-twitterblue/[0.15] transition ease-in-out rounded-full p-2">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24" aria-hidden="true"
                            class="fill-gray-500 group-hover:fill-emerald-500 transition ease-in-outr-1bwzh9t r-4qtqp9 r-yyyyoo r-10ptun7 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1janqcz"
                                width="20" height="20">
                                <g>
                                <path
                                        d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z">
                                        </path>
                                        </g>
                            </svg>
                            </span>

                            <span class="text-sm text-gray-500 group-hover:text-emerald-500 transition ease-in-out">${tweet.tweet_total_retweets}</span>
                        
                            `}
                            
                    </div>
                    
                    
                    <div id="tweet_likey_${retweet.tweet_id}">

                      <form onsubmit="likeTweet(); return false" id="like_${retweet.tweet_id}">
                      <input style="display:none;" type="text" name="tweet_fk" value="${retweet.tweet_id}"
                      data-username="${retweet.user_username}">
                      <button class=" flex items-center hover cursor-pointer group">
                      <span class="group-hover:bg-pink-600/[0.15] transition ease-in-out rounded-full p-2">
                      <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                      aria-hidden="true"
                      class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi" width="24"
                      height="24">
                      <g fill="#71767B">
                            <path
                            d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
                                fill="#71767B"></path>
                                </g>
                                </svg>
                                </span>
                                <span class="text-sm text-gray-500 group-hover:text-pink-600 transition ease-in-out">
                    0
                    </span>
                    </button>
                    </form>
                    </div>
                    
                    
                    <div class="hidden sm:flex items-center cursor-pointer group">
                        <span class="group-hover:bg-twitterblue/[0.15] transition ease-in-out rounded-full p-2">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24" strok aria-hidden="true"
                                class="fill-gray-500 group-hover:fill-bg-twitterblue transition ease-in-out r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
                                width="20" height="20">
                                <g>
                                <path
                                d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z">
                                    </path>
                                    </g>
                                    </svg>
                                    </span>
                                    <span
                                    class="pl-2 text-sm text-gray-500 group-hover:text-bg-twitterblue transition ease-in-out">3.4M</span>
                                    </div>
                                    
                                    
                                    <div class="flex items-center cursor-pointer group">
                        <span class="group-hover:bg-twitterblue/[0.15] transition ease-in-out rounded-full p-2">
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24" aria-hidden="true"
                        class="fill-gray-500 group-hover:fill-bg-twitterblue transition ease-in-out r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
                        width="20" height="20">
                        <g>
                        <path
                                        d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z">
                                        </path>
                                        </g>
                                        </svg>
                                        </span>
                                        </div>
                                        </div>
                                        </div>
                                        
                            
    </div>
    </div>
    `)


        // Select all retweetOption modals
        const allRetweetOptionsModals = document.querySelectorAll('.retweetModal')
        let currenModal = {};
        const optionsSpread = [...allRetweetOptionsModals]
        // Finding the one that is currently missing the hidden class
        optionsSpread.map(node => !node.classList.contains('hidden') ? currenModal = node : "");
        currenModal.classList.add('hidden');
        // Adding hidden to the overlay modal
        currenModal.nextElementSibling.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' })

    } else if (retweet !== null && tweet.tweet_message) {


        document.querySelector("#tweets").insertAdjacentHTML("afterbegin", `
 <div class="border-t border-bordergray pr-4">
       <div class="w-contain flex" id="tweet">
        <!-- left -->

        <div class=" flex flex-col w-fit md:w-fit p-2 items-center ml-2 mr-2">
            <a href="${user.user_username}" class="w-[48px] h-[48px]">
                <img src="../images/${user.user_avatar}" class="rounded-full" alt="" />
            </a>

        </div>
        <!-- right -->
        <!-- I need to loop through the tweets to know if there is a reply or not - Inside the if I need to check if
                      the tweet has a reply and if it has a reply through the replies. The code should be in place on render_profile.py -->
        <form id="tweet_message_form">
            <div class="flex flex-wrap mt-4 md:mt-2 w-full lg:pr-4">

                <!-- Tweet form w. message +  -->

                <input style="display:none;" type="text" name="tweet_id" value="${tweet.tweet_id}">
                <div class="flex flex-col w-full">
                    <div class="flex">
                        <p class="flex  w-full text-fif font-semibold">
                            <a href="${user.user_username}">

                                ${user.user_first_name} ${user.user_last_name ? user.user_last_name : ""}
                            </a>
                            <span class="flex items-center">

                                ${user.user_total_followers >= 2 ? `<span
                                    class="flex cursor-pointer font-semibold text-slate-200 text-base hover:underline underline-offset-2">

                                    <span class="flex items-center px-1">

                                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24" aria-label="Verified account" role="img"
                                            class="r-1cvl2hr r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr"
                                            data-testid="icon-verified" width="20" height="20">
                                            <g fill="#1D9BF0">
                                                <path
                                                    d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"
                                                    fill="#1D9BF0"></path>
                                            </g>
                                        </svg>
                                    </span>
                                </span>` : ``}

                                <a href="${user.user_username}"> <span class="text-sm flex items-center text-gray-500 ml-2">
                                        <strong>@</strong>
                                        ${user.user_username} <span class="mx-1">·</span>
                                        Now
                                    </span>
                                </a>

                            </span>

                            <!-- Tweet modal / logged in user -->
                            </p>
                            <div>
    <div class="relative" id="tweet_modal_parent_${tweet.tweet_id}">
        <div onclick="handleTweetModal();"
            class=" ml-auto hover:text-sky-600 text-sm items-center hover:underline underline-offset-2 cursor-pointer hover:bg-twitterblue/[0.15] transition ease-in-out rounded-full h-fit"
            value="ellipses" data-name="tweetmodal">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 rotate-90 cursor-pointer group-hover:stroke-bg-twitterblue transition ease-in-out z-10 pointer-events-none">
                <path class="pointer-events-none" stroke-linecap="round" stroke-linejoin="round"
                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z">
                </path>
            </svg>

        </div>
        <!-- Tweet Modal content -->
        <div
            class="hidden absolute top-0 right-0 mt-6 w-[310px] bg-black shadow-[0_0px_15px_1px_rgba(255,255,255,0.3)] rounded-xl">
            <!-- Button for logged users -->
            <ul class="py-2 px-4">
                <li class="text-[#F4212E] text-[15px font-semibold ">

                    <button class="flex w-full" onclick="deleteTweet(); return false"
                        value="458af5d352ad41aeaf8c3b38ca425850">

                        <svg class="pointer-events-none" xmlns:xlink="http://www.w3.org/1999/xlink"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" width="24"
                            height="24">
                            <g fill="#F4212E">
                                <path
                                    d="M16 6V4.5C16 3.12 14.88 2 13.5 2h-3C9.11 2 8 3.12 8 4.5V6H3v2h1.06l.81 11.21C4.98 20.78 6.28 22 7.86 22h8.27c1.58 0 2.88-1.22 3-2.79L19.93 8H21V6h-5zm-6-1.5c0-.28.22-.5.5-.5h3c.27 0 .5.22.5.5V6h-4V4.5zm7.13 14.57c-.04.52-.47.93-1 .93H7.86c-.53 0-.96-.41-1-.93L6.07 8h11.85l-.79 11.07zM9 17v-6h2v6H9zm4 0v-6h2v6h-2z"
                                    fill="#F4212E"></path>
                            </g>
                        </svg>

                        <p class="ml-2 pointer-events-none">Delete</p>

                    </button>

                </li>
            </ul>
            <!-- Button for other users -->

        </div>
    </div>
    <!-- Tweet Overlay modal -->
    <div class="hidden fixed  top-0 left-0 w-full h-full bg-white opacity-0" data-name="overlay"
        onclick="handleTweetModal()">
    </div>
</div>
                    </div>
                    <p class="flex flex-wrap text-base">
                        <span>${tweet.tweet_message} </span>
                    </p>
                  ${tweet.tweet_image ? `<p class="w-full mt-2">
        <img src="../images/${tweet.tweet_image}" class="rounded-xl" alt="">
    </p>` : ""}
                </div>
    </form>






      
        <div class="w-[505px] border border-bordergray rounded-lg text-white mt-4">
            <div class="w-contain flex" id="tweet">
                <!-- left -->


                <div class="flex flex-wrap mt-4 md:mt-2 w-full = h-full">

                    <!-- Tweet form w. message +  -->


                    <div class="flex flex-col w-full">

                        <div class="flex items-center ml-2 p-1">
                            <div
                                class="w-[20px] h-[20px] tweet_img_parent overflow-hidden rounded-full flex justify-center items-center mr-2">
                                <a href="${retweet.user_username}"
                                    class="w-full h-full flex justify-center items-center">
                                    <img src="../images/${retweet.user_avatar}" alt="" />
                                </a>
                            </div>
                            <p class="flex  w-full text-fif font-semibold">
                                <a href="${retweet.user_username}">
                                    ${retweet.user_first_name}
                                    ${retweet.user_last_name ? retweet.user_last_name : ''}
                                    
                                </a>
                                <span class="flex items-center">
                                    ${retweet.user_total_followers > 2 ? `      <span
                                        class="flex cursor-pointer font-semibold text-slate-200 text-base hover:underline underline-offset-2">

                                        <span class="flex items-center px-1">

                                            <svg xmlns:xlink="http://www.w3.org/1999/xlink"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                aria-label="Verified account" role="img"
                                                class="r-1cvl2hr r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr"
                                                data-testid="icon-verified" width="20" height="20">
                                                <g fill="#1D9BF0">
                                                    <path
                                                        d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"
                                                        fill="#1D9BF0"></path>
                                                </g>
                                            </svg>
                                        </span>
                                    </span>`: ``}
                              

                                    <a href="${retweet.user_username}"> <span
                                            class="text-sm flex items-center text-gray-500 ml-2">
                                            <strong>@</strong>
                                            ${retweet.user_username} <span class="mx-1">·</span>
                                            Now
                                        </span></a>

                                </span>

                                <!-- Tweet modal / logged in user -->





                        </div>
                        </p>
                        <p class="flex flex-wrap text-base ml-2">
                            <span>${retweet.tweet_message} </span>
                            ${secondRetweet ? `${thirdRetweet ? ` <span
                                                        class="ml-1">twitter.com/${thirdRetweet.user_username}/stat…
                                                    </span>`: `<span

                                                    class="ml-1">twitter.com/${secondRetweet.user_username}/stat…
                                                    </span>`}

                         ${retweet.tweet_image ? `  <p class="w-full mt-2">
                            <img src="../images/${retweet.tweet_image}" class="rounded-xl" alt="" name="tweetIMG">
                        </p>` : ``}` : ``}
                            
                      
                        
                    </div>


                </div>
            </div>
        </div>
                        
        <!-- Icons -->
                <div class="flex w-full justify-between lg:-ml-2 mt-2 text-gray-700 lg:pr-6 pb-2">
                    
                    <div class="flex items-center cursor-pointer group">
                        <span class="group-hover:bg-twitterblue/[0.15] transition ease-in-out rounded-full p-2">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24" aria-hidden="true"
                                class="fill-gray-500 group-hover:fill-bg-twitterblue transition ease-in-out r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
                                width="20" height="20">
                                <g>
                                    <path
                                        d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z">
                                    </path>
                                </g>
                            </svg>
                        </span>

                        <span
                            class="text-sm text-gray-500 group-hover:text-bg-twitterblue transition ease-in-out">989</span>
                    </div>


                    <div class="flex items-center cursor-pointer group">

                        ${tweet.tweet_role === '2' ? `       <span class="group-hover:bg-twitterblue/[0.15] transition ease-in-out rounded-full p-2">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24" aria-hidden="true"
                                class="fill-[#00BA7C] group-hover:fill-emerald-500 transition ease-in-outr-1bwzh9t r-4qtqp9 r-yyyyoo r-10ptun7 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1janqcz"
                                width="20" height="20">
                                <g>
                                    <path
                                        d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z">
                                    </path>
                                </g>
                            </svg>
                        </span>

                        <span class="text-sm text-[#00BA7C] group-hover:text-emerald-500 transition ease-in-out">${retweet.tweet_total_retweets}</span>` : `
                        
                               <span class="group-hover:bg-twitterblue/[0.15] transition ease-in-out rounded-full p-2">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24" aria-hidden="true"
                                class="fill-gray-500 group-hover:fill-emerald-500 transition ease-in-outr-1bwzh9t r-4qtqp9 r-yyyyoo r-10ptun7 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1janqcz"
                                width="20" height="20">
                                <g>
                                    <path
                                        d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z">
                                    </path>
                                </g>
                            </svg>
                        </span>

                        <span class="text-sm text-gray-500 group-hover:text-emerald-500 transition ease-in-out">${retweet.tweet_total_retweets}</span>
                        
                        `}
                 
                    </div>


                    <div id="tweet_likey_${tweet.tweet_id}">

                      <form onsubmit="likeTweet(); return false" id="like_${tweet.tweet_id}">
            <input style="display:none;" type="text" name="tweet_fk" value="${tweet.tweet_id}"
                data-username="${user.user_username}">
            <button class=" flex items-center hover cursor-pointer group">
                <span class="group-hover:bg-pink-600/[0.15] transition ease-in-out rounded-full p-2">
                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        aria-hidden="true"
                        class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi" width="24"
                        height="24">
                        <g fill="#71767B">
                            <path
                                d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
                                fill="#71767B"></path>
                        </g>
                    </svg>
                </span>
                <span class="text-sm text-gray-500 group-hover:text-pink-600 transition ease-in-out">
                    0
                </span>
            </button>
        </form>
    </div>


                    <div class="hidden sm:flex items-center cursor-pointer group">
                        <span class="group-hover:bg-twitterblue/[0.15] transition ease-in-out rounded-full p-2">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24" strok aria-hidden="true"
                                class="fill-gray-500 group-hover:fill-bg-twitterblue transition ease-in-out r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
                                width="20" height="20">
                                <g>
                                    <path
                                        d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z">
                                    </path>
                                </g>
                            </svg>
                        </span>
                        <span
                            class="pl-2 text-sm text-gray-500 group-hover:text-bg-twitterblue transition ease-in-out">3.4M</span>
                    </div>


                    <div class="flex items-center cursor-pointer group">
                        <span class="group-hover:bg-twitterblue/[0.15] transition ease-in-out rounded-full p-2">
                            <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24" aria-hidden="true"
                                class="fill-gray-500 group-hover:fill-bg-twitterblue transition ease-in-out r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
                                width="20" height="20">
                                <g>
                                    <path
                                        d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z">
                                    </path>
                                </g>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
            </div>
    </div>
                         
`
        )
        let modal = '';

        if (frm[2].name === 'previous_tweet_fk') {
            modal = document.querySelector(`#retweetQuoteModal_${frm[2].value}`)
        } else {
            modal = document.querySelector(`#retweetQuoteModal_${frm[1].value}`)
        }
        modal.classList.add('hidden')
        modal.previousElementSibling.classList.add('hidden')
        modal.previousElementSibling.previousElementSibling.classList.add('hidden')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    frm[0].value = "";
    frm[1].value = "";


    if (frm.parentElement.classList.contains('retweetModal')) {
        frm.parentElement.classList.add('hidden')
        frm.parentElement.nextElementSibling.classList.add('hidden')
    }
    if (output.src.includes('blob')) {
        handleFile(event);
    }

}

// handleFile() takes care of either showing a preview of an image or losing an image down
function handleFile(event) {
    closeButton.classList.contains('hidden') ? loadFile(event) : closeImg();

    function loadFile(event) {
        closeButton.classList.remove('hidden');
        output.src = URL.createObjectURL(event.target.files[0]);
        tweetInput.setAttribute('data-min', 0)
        ableButtonPic()
    }

    function closeImg() {
        URL.revokeObjectURL(output.src)
        output.src = '';
        closeButton.classList.add('hidden')
        ableButtonPic()
    }
}

// ableButtonText registers if there is any text and calls another function to enable button or disable if there is no text
function ableButtonText() {
    const char = tweetInput.value;
    const spaces = char.split(' ');
    const spacesLength = spaces.length;
    const actualLenght = char.length - spacesLength;
    actualLenght >= 0 ? removeAtt() : applyAtt();
}
// ableButtonPic registers a picture and calls removeAtt() to enable button
function ableButtonPic() {
    output.src.includes('blob') ? removeAtt() : applyAtt();
}

// removeAtt() enables tweet button by removing disable attribute
function removeAtt() {
    tweetButton.removeAttribute('disabled', '')
    tweetButton.style.backgroundColor = '#1A8CD8'
    tweetButton.style.colorolor = '##FFFFFF'


}
// applyAtt() adds disabled when called
function applyAtt() {
    tweetButton.setAttribute('disabled', '')
    tweetButton.style.backgroundColor = '#0E4E78'
    tweetButton.style.colorolor = '##808080'

}