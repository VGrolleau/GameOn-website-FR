function showResponsiveMenu() {
    let menu = document.getElementById("topnav_responsive_menu");
    let icon = document.getElementById("topnav_hamburger_icon");
    let rootId = document.getElementById("rootId");
    if (menu.className === "") {
        menu.className = "open";
        icon.className = "open";
        rootId.style.overflowY = "hidden";
    } else {
        menu.className = "";
        icon.className = "";
        rootId.style.overflowY = "";
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
const checkboxCGU = document.getElementById("checkbox1");
const radioInputs = document.querySelectorAll(".radio-input");
const checkboxInputs = document.querySelectorAll(".checkbox-input");
let validation = 0;
const validationMax = 7;
const inputs = document.getElementsByTagName('input');
let checkedRadio = 0;

// close modal event
closeBtn.addEventListener('click', closeModal);

// launch modal form
function launchModal() {
    modalbg.style.display = "flex";
    modalBody.style.display = "inline";
    confirmationContent.style.display = "none";
    birthDate.max = setMaxDate();
    document.getElementById("checkbox1").required = true;

    first.addEventListener('change', onChangeValue);
    last.addEventListener('change', onChangeValue);
    email.addEventListener('change', onChangeValue);
    birthDate.addEventListener('change', onChangeValue);
    quantity.addEventListener('change', onChangeValue);

    radioInputs.forEach(radioInput => {
        radioInput.addEventListener('change', verifCheck);
    });
    checkboxInputs.forEach(checkboxInput => {
        checkboxInput.addEventListener('change', verifCheck);
    });
}

// function close
function closeModal() {
    modalbg.style.display = "none";
}

// function validate
modalBody.addEventListener('submit', function(event) {
    event.preventDefault();
    for (let i = 0; i < inputs.length; i++) {
        console.log(inputs[i].value);
        if (inputs[i].value == "") {
            inputs[i].parentElement.dataset.errorVisible = true;
            inputs[i].parentElement.dataset.error = "Merci de compléter ce champ";
            console.log(inputs[i].type);
            console.error("Merci de compléter ce champ");
        }

        if (inputs[i].type == "radio") {
            if (inputs[i].checked) {
                console.log("checked");
                checkedRadio++;
                console.log(checkedRadio);
            }

            if (checkedRadio > 0) {
                inputs[i].parentElement.parentElement.dataset.errorVisible = false;
                delete inputs[i].parentElement.parentElement.dataset.error;
            } else {
                console.log("non checked");
                inputs[i].parentElement.parentElement.dataset.errorVisible = true;
                inputs[i].parentElement.parentElement.dataset.error = "Merci de choisir un lieu";
                console.log(checkedRadio);
            }
        }
    }

    if (checkedRadio > 0 && checkboxCGU.checked && validation >= validationMax) {
        launchConfirmation()
    }
});

function launchConfirmation() {
    modalBody.style.display = "none";
    confirmationContent.style.display = "flex";
    validation = 0;
    document.reserve.reset();
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
    'first': {
        minLenght: 2,
        match: /^[A-Z][a-z]{1,}$/,
        messageError: 'Le texte doit faire minimum 2 caractères, ne contenir que des lettres, et commencer par une majuscule.'
    },
    'last': {
        minLenght: 2,
        match: /^([A-Z]{1})([a-z]{1,})|([A-Z]{2,})/,
        messageError: 'Le texte doit faire minimum 2 caractères, ne contenir que des lettres, et commencer par une majuscule.'
    },
    'email': {
        match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
        messageError: 'Merci de renseigner un email valide'
    },
    'birthdate': {
        max: setMaxDate(),
        match: /^([0-9]{4}-[0-9]{2}-[0-9]{2})$/,
        messageError: 'Merci de renseigner une date valide'
    },
    'quantity': {
        min: 0,
        max: 99,
        match: /^([0-99])$/,
        messageError: 'Merci de renseigner un nombre, compris entre 0 et 99'
    }
}

function onChangeValue(event) {
    if (event.target.id == "birthdate") {
        if (event.target.value != "") {
            validation++;
        }
    }

    let validationMatch = validationRules[event.target.id].match;

    if (!validationMatch.test(event.target.value)) {
        event.target.parentElement.dataset.errorVisible = true;
        event.target.parentElement.dataset.error = validationRules[event.target.id].messageError;
        validation += 0;
    } else {
        event.target.parentElement.dataset.errorVisible = false;
        delete event.target.parentElement.dataset.error;
        validation++;
    }
}

function verifCheck(event) {
    if (event.target.checked) {
        validation++;
    }

    if (event.target.id == "checkbox1") {
        if (!event.target.checked) {
            event.target.parentElement.parentElement.dataset.errorVisible = true;
            event.target.parentElement.parentElement.dataset.error = "Merci de cocher cette case";
        } else {
            event.target.parentElement.parentElement.dataset.errorVisible = false;
            delete event.target.parentElement.parentElement.dataset.error;
        }
    }
}