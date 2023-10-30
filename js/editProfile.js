"use strict"
const modalEdit = document.querySelector('#editModalOverlay');
const feedbackEdit = document.querySelector('#feed_back_modul_edit_profile');
const messageEdit = document.querySelector('#messageEdit');
const showHintRemove = document.querySelector('#hintDeleteCover');
const showHintAddPhoto = document.querySelector('#hintAddPhotoCover');
const showHintAddPhotoProfile = document.querySelector('#hintAddPhotoProfile');
const editCoverImg = document.querySelector('#editCoverImg');
const closeButtonModal = document.querySelector('#closeEditModal')
const discardChangesOverlay = document.querySelector('#discardChangesOverlay')
const frm = document.querySelector('#edit_user_info_form');
const cover_parent = document.querySelector('#cover_parent');
const firstNameparentAll = document.querySelectorAll('.first_name_parent')
const lastNameParentAll = document.querySelectorAll('.last_name_parent')
const descriptionParent = document.querySelector('#description_parent')
const websiteParent = document.querySelector('#website_parent')
const locationParent = document.querySelector('#location_parent')
const avatarParent = document.querySelector('#avatar_parent')
const loginParentAll = document.querySelectorAll('.login_parent')
let delete_image = 0;
let upload_image = 0;
const tweetsParent = document.querySelectorAll(".tweet_img_parent")


console.log(firstNameparentAll.parentElement)
const testSpread = [...firstNameparentAll]
testSpread.map(node => console.log(node.parentElement.nodeName))


async function editUserInfo() {

    if (upload_image === 1) {
        uploadImages()
    }
    const conn = await fetch("/api-update-user-info", {
        method: "PUT",
        body: new FormData(frm)
    })
    const data = await conn.json() // to get plain text
    const user = data.user_info
    data.info === "ok" ? changeInfo() : errorMessage();

    function changeInfo() {
        const firstNameSpread = [...firstNameparentAll]
        const lastNameSpread = [...lastNameParentAll]
        // Parent div === profile text
        // Span div === login text
        firstNameSpread.map(node => node.firstElementChild.remove())
        lastNameSpread.map(node => node.firstElementChild.remove())

        descriptionParent.firstElementChild.remove()

        if (websiteParent.firstElementChild) {
            websiteParent.firstElementChild.remove()
            websiteParent.lastElementChild.remove()
        }


        if (locationParent.firstElementChild) {
            locationParent.firstElementChild.remove()
            locationParent.lastElementChild.remove()
        }



        firstNameSpread.map(node => node.parentElement.nodeName === 'DIV' ?
            node.insertAdjacentHTML("afterbegin", `
         <p class="flex text-[20px] font-bold">
                   ${user.user_first_name}
                </p>

        `)
            :
            node.insertAdjacentHTML("afterbegin", `

                <p class="flex text-15 font-bold">
                                    ${user.user_first_name}
                            </p>

        `))
        lastNameSpread.map(node => node.parentElement.nodeName === 'DIV' ?
            node.insertAdjacentHTML("afterbegin", `
           <p class="ml-1 text-[20px] font-bold">${user.user_last_name}</p>
           </p>


        `)
            :
            node.insertAdjacentHTML("afterbegin", `
           <p class="ml-1 text-15 font-bold">${user.user_last_name}</p>
        `))


        document.querySelector(`#${descriptionParent.id}`).insertAdjacentHTML("afterbegin",
            `<p class="text-15 pb-2 pl-[20px]">${user.user_description}</p>

            `)


        if (user.user_website !== '') {
            document.querySelector(`#${websiteParent.id}`).insertAdjacentHTML("afterbegin",
                `    <span class="mr-1">
                  <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    aria-hidden="true"
                    class="r-1bwzh9t r-4qtqp9 r-yyyyoo r-1xvli5t r-1d4mawv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
                    width="20" height="20">
                    <g fill="#71767B">
                      <path
                        d="M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z"
                        fill="#71767B"></path>
                    </g>
                  </svg>
                </span>

                <a class='text-gray-500 mr-3' href="${user.user_website}">${user.user_website}</a>
            `)

        }
        console.log(user.user_geo_location)
        if (user.user_geo_location !== '') {
            document.querySelector(`#${locationParent.id}`).insertAdjacentHTML("afterbegin",
                `
              <span class="mr-1">
                    <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    aria-hidden="true"
                    class="r-1bwzh9t r-4qtqp9 r-yyyyoo r-1xvli5t r-1d4mawv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
                    width="24" height="24">
                    <g fill="#71767B">
                      <path
                        d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"
                        fill="#71767B"></path>
                    </g>
                  </svg>
                </span>
                <span class="text-15 text-gray-500 mr-2"">${user.user_geo_location}</span>


            `)
        }

        if (data.message === 'cover') {
            cover_parent.firstElementChild.remove();
            editCoverImg.remove();
            document.querySelector(`#${cover_parent.id}`).insertAdjacentHTML("afterbegin",
                `    <img src="../images/${data.cover_image}" id="editCoverImg" alt=""
                                    class="row-start-1 col-start-1 -z-10"> `)

        }

        if (delete_image === 1) {
            deleteImage()
        }
        handleModalEdit()
    }
    function errorMessage() {
        console.log(data.errortype)
    }
}

async function uploadImages() {
    const conn = await fetch("/api-update-user-info-images", {
        method: "PUT",
        body: new FormData(frm)
    })
    const data = await conn.json() // to get plain text
    console.log(data)
    const user = data.user
    const updates = data.updates
    if (updates.includes('cover') && updates.includes('avatar')) {
        changeCover()
        changeAvatars()
    } else if (updates.includes('avatar')) {
        changeAvatars()
    } else if (updates.includes('cover')) {
        changeCover()
    }


    function changeCover() {
        cover_parent.firstElementChild.remove();
        document.querySelector(`#${cover_parent.id}`).insertAdjacentHTML("afterbegin",
            `<img src=" ../images/${user.user_cover_image}" class="w-full h-full" alt="">
        `)
        frm[2].value = "";
    }
    function changeAvatars() {
        avatarParent.firstElementChild.remove();
        document.querySelector(`#${avatarParent.id}`).insertAdjacentHTML("afterbegin",
            `
           <img class="" src="../images/${user.user_avatar}" alt="">

            `)
        // Change avatars in tweets
        const nodeSpreadTweets = [...tweetsParent] // Transform nodelist to array
        nodeSpreadTweets.map(node => node.firstElementChild.remove()) // Remove each instance of the specific form (from the tweets only)
        nodeSpreadTweets.map(node => node.insertAdjacentHTML("afterbegin", ` <a href="${user.user_username}" class="">
                <img src="../images/${user.user_avatar}" class="rounded-full" alt="" />
            </a>`))

        // Change login avatars, frontpage + profile page
        const nodeSpreadLoginAvatars = [...loginParentAll] // Transform nodelist to array
        nodeSpreadLoginAvatars.map(node => node.firstElementChild.remove()) // Remove each instance of the specific form (from the tweets only)
        nodeSpreadLoginAvatars.map(node => node.insertAdjacentHTML("afterbegin", ` <img class="pointer-events-none" src ="../images/${user.user_avatar}" alt = "">`))


        frm[1].value = "";
    }





}

async function deleteImage() {
    const conn = await fetch("/api-delete-image", {
        method: "DELETE",
        body: new FormData(frm)
    })
    const data = await conn.json() // to get plain text
    console.log(data)
    cover_parent.firstElementChild.remove();
    editCoverImg.remove();
    document.querySelector(`#${cover_parent.id}`).insertAdjacentHTML("afterbegin",
        `    <img src="../images/${data.cover_image}" id="editCoverImg" alt=""
                                    class="row-start-1 col-start-1 -z-10"> `)


}


function removePreviewCover() {
    console.log('removePreviewCover')
    editCoverImg.src = '';
    document.querySelector('#removePhoto').remove()
    closeButtonModal.removeAttribute("onclick");
    closeButtonModal.setAttribute("onclick", "discardChanges(); return false");
    // Set the image-flag so that it is known a change has been made to images
    delete_image = 1;
}

function closeModalEdit() {
    feedbackEdit.classList.add('hidden')
}

function discardChanges() {
    discardChangesOverlay.classList.remove('hidden')
}

function handleDiscardModal() {
    if (event.target.innerText === 'Discard') {
        event.target.closest('#editModalOverlay').classList.add('hidden')
        discardChangesOverlay.classList.add('hidden');
        // Set the image-flag to 0
        images = 0;
    } else {
        event.target.closest('#discardChangesOverlay').classList.add('hidden')
    }

    // event.target.closest('#discardChangesOverlay').classList.add('hidden');
}

function handleEditUpload(event) {
    upload_image = 1;
    let target
    console.log(event.target)
    if (event.target.id === "cover_file") {
        if (document.querySelector('#editCoverImgDefault')) {
            document.querySelector('#editCoverImgDefault').remove()
        }
        target = "editCoverImg"
    } else {
        target = "editProfileImg";
    }

    document.querySelector(`#${target}`).src = URL.createObjectURL(event.target.files[0]);
}

function handleModalEdit() {
    modalEdit.classList.contains('hidden') ? modalEdit.classList.remove('hidden') : modalEdit.classList.add('hidden');
}


function showHint() {

    if (event.target.id === "removePhoto") {
        showHintRemove.classList.remove('hidden')

    } else if (event.target.id === "addPhoto") {
        showHintAddPhoto.classList.remove('hidden')

    } else if (event.target.id === "addPhotoProfile") {

        showHintAddPhotoProfile.classList.remove('hidden')

    }
}
function removeHint() {
    if (event.target.id === "removePhoto") {
        showHintRemove.classList.add('hidden')
    } else if (event.target.id === "addPhoto") {
        showHintAddPhoto.classList.add('hidden')
    } else if (event.target.id === "addPhotoProfile") {
        showHintAddPhotoProfile.classList.add('hidden')
    }
}