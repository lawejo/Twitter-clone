"use strict"

const target = document.querySelector("#scrollTarget2");
const targetArea = document.querySelector("#targetArea2")
function register() {
    console.log(event.target)
}
const options = {
    root: null,
    threshold: 0.3,
    rootMargin: "-100px",
}

const theObserver = new IntersectionObserver(callBackFunction, options);
theObserver.observe(target);



function callBackFunction(entries) {
    const [entry] = entries;
    if (entry.isIntersecting) {
        targetArea.style.position = "sticky";
        targetArea.style.top = "-800px";
        targetArea.style.right = "0";
    } else {
    }
}

// ---------------------------------------------------------



// ---------------------------------------------------------




