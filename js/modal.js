function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
// const modalbg = document.querySelector(".bground");
const modalbg = document.querySelector(".modal-bg");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const modalWrapper = document.querySelector(".modal-wrapper");
const modalBody = document.querySelector(".modal-body");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeBtn.addEventListener('click', closeModal);

// launch modal form
function launchModal() {
    // modalbg.style.display = "block";
    modalbg.style.display = "flex";
}

// function close
function closeModal() {
    modalbg.style.display = "none";
}

// function createConfirmationDiv
function createConfirmationDiv() {
    let modalConfirmationDiv = document.createElement("div");
    modalConfirmationDiv.classList.add("modal-confirmation");
    modalBody.appendChild(modalConfirmationDiv);
}

function createFormContent() {

}

// function validate
function validate(event) {
    event.preventDefault();

    createConfirmationDiv();
    // modalBody.appendChild(modalConfirmationDiv);

    // const modalConfirmation = document.querySelector(".modal-confirmation");
    // addConfirmationContent(modalConfirmation);
    addConfirmationContent(modalBody);
}

// function addConfirmationContent
function addConfirmationContent(container) {
    let confirmationText = document.createElement("h2");
    confirmationText.innerText = "Merci pour votre inscription";
    container.appendChild(confirmationText);

    let closeBtnConfirmation = document.createElement("button");
    closeBtnConfirmation.innerText = "Fermer";
    closeBtnConfirmation.classList.add("btn", "btn-close");
    container.appendChild(closeBtnConfirmation);
    closeBtnConfirmation.addEventListener('click', closeModal);
}