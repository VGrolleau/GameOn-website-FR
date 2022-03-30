function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".modal-bg");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const modalWrapper = document.querySelector(".modal-wrapper");
const modalBody = document.querySelector(".modal-body");
const confirmationContent = document.querySelector(".confirmation-content");
const formDataError = document.querySelector(".formData[data-error]");
const first = document.getElementById('first');
const last = document.getElementById('last');
const email = document.getElementById('email');
const birthDate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
let validation = '';

// close modal event
closeBtn.addEventListener('click', closeModal);

// launch modal form
function launchModal() {
    modalbg.style.display = "flex";
    modalBody.style.display = "inline";
    confirmationContent.style.display = "none";
    birthDate.max = setMaxDate();
    verifType(last);
}

// function close
function closeModal() {
    modalbg.style.display = "none";
}

// function validate
function validate(event) {
    event.preventDefault();
    // let firstMessage = validationRules["input[type:text]"].messageError;
    // console.log(dateNow);
    modalBody.style.display = "none";
    confirmationContent.style.display = "flex";
}

function setMaxDate() {
    let dateNow = new Date();
    let actualYear = dateNow.getFullYear();
    let actualMonth = dateNow.getMonth() + 1;
    actualMonthComplete = getCompleteMonth(actualMonth);
    let actualDay = dateNow.getDate();
    return `${actualYear}-${actualMonthComplete}-${actualDay}`;
}

function getCompleteMonth(month) {
    if (month < 10) {
        return `0${month}`
    } else {
        return month
    }
}

const validationRules = {
    'text': {
        minLenght: 2,
        match: /^[A-Z][a-z]{1,}$/,
        messageError: 'Le texte doit faire minimum 2 caractères, ne contenir que des lettres, et commencer par une majuscule.'
    },
    'email': {
        match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
        messageError: 'Merci de renseigner un email valide'
    },
    // 'date': {
    //     max: setMaxDate()
    // },
    'number': {
        min: 0,
        max: 99,
        match: /^([0-99])\d$/,
        messageError: 'Merci de renseigner un nombre, compris entre 0 et 99'
    }
}

function verifType(input) {
    let type = input.type;

    switch (type) {
        case 'text':
            validation = validationRules.text;
            break;

        case 'email':
            validation = validationRules.email;
            break;

        case 'number':
            validation = validationRules.number;
            break;

        default:
            break;
    }
    console.log(validation);
}

first.addEventListener('change', onChangeValue);
last.addEventListener('change', onChangeValue);
email.addEventListener('change', onChangeValue);
quantity.addEventListener('change', onChangeValue);

function onChangeValue(event) {
    console.log(event.target[after]);
    let validationMatchText = validationRules[event.target.type].match;
    // let validationMatchText = validationRules.text.match;
    // console.log(validationMatchText.test(first.value));
    // console.log(validationMatchText.test(event.target.value));
    // console.log(first.value);
    if (!validationMatchText.test(event.target.value)) {
        console.error(validationRules[event.target.type].messageError);
        // formData.dataset.errorVisible;
        // event.target.style.background = 'blue'
        event.target.dataset.error = validationRules[event.target.type].messageError;
    }
}