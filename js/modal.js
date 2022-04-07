function showResponsiveMenu() {
    let menu = document.getElementById("topnav_responsive_menu");
    let icon = document.getElementById("topnav_hamburger_icon");
    if (menu.className === "") {
        menu.className = "open";
        icon.className = "open";
    } else {
        menu.className = "";
        icon.className = "";
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
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const checkboxCGU = document.getElementById("checkbox1");
const radioLocations = document.getElementById("radioLocations");
const checkboxInputs = document.querySelectorAll(".checkbox-input");
let error = 0;
const inputs = document.getElementsByTagName('input');
let checkedRadio = 0;

// close modal event
closeBtn.addEventListener('click', closeModal);

// launch modal form
function launchModal() {
    modalbg.style.display = "flex";
    modalBody.style.display = "inline";
    confirmationContent.style.display = "none";
    birthdate.max = setMaxDate();
    document.getElementById("checkbox1").required = true;
}

// function close
function closeModal() {
    modalbg.style.display = "none";
}

const validationRules = {
    'first': {
        minLength: {
            min: 2,
            messageError: "Le prénom doit faire minimum 2 caractères."
        },
        regex: {
            match: /^([A-Z]{1})([aA-zZ\- ]{1,})$/,
            messageError: 'Le prénom ne doit contenir que des lettres, et commencer par une majuscule.'
        }
    },
    'last': {
        minLength: {
            min: 2,
            messageError: "Le nom doit faire minimum 2 caractères."
        },
        regex: {
            match: /^([A-Z]{1})([aA-zZ\- ]{1,})$/,
            messageError: 'Le nom ne doit contenir que des lettres, et commencer par une majuscule.'
        }
    },
    'email': {
        regex: {
            match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
            messageError: 'Merci de renseigner un email valide.'
        }
    },
    'birthdate': {
        maxDate: {
            max: setMaxDate(),
            messageError: "La date de naissance ne peut être supérieure à la date actuelle."
        },
        regex: {
            match: /^([0-9]{4}-[0-9]{2}-[0-9]{2})$/,
            messageError: 'Merci de renseigner une date valide'
        }
    },
    'quantity': {
        minNumber: {
            min: 0,
            messageError: 'Le nombre doit être au minimum 0'
        },
        maxNumber: {
            max: 99,
            messageError: 'Le nombre doit être au maximum 99'
        },
        regex: {
            match: /^([0-99])$/,
            messageError: 'Merci de renseigner un nombre'
        }
    },
    'radioLocations': {
        require: {
            required: true,
            messageError: "Merci de choisir un lieu"
        }
    },
    'checkbox1': {
        require: {
            required: true,
            messageError: "Merci de cocher cette case"
        }
    }
}

// function validate
modalBody.addEventListener('submit', function(event) {
    event.preventDefault();
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
            inputs[i].parentElement.dataset.errorVisible = true;
            inputs[i].parentElement.dataset.error = "Merci de compléter ce champ";
        }
    }

    for (let firstRule in validationRules) {
        switch (firstRule) {
            case 'first':
                checkMinlength(first);
                checkRegex(first);
                break;

            case 'last':
                checkMinlength(last);
                checkRegex(last);
                break;

            case 'email':
                checkRegex(email);
                break;

            case 'birthdate':
                checkRegex(birthdate);
                checkMaxDate(birthdate);
                break;

            case 'quantity':
                checkMinMaxNumber(quantity);
                checkRegex(quantity);
                break;

            case 'radioLocations':
                checkCheckedRadio(radioLocations);
                break;

            case 'checkbox1':
                checkChecked(checkbox1);
                break;

            default:
                break;
        }
    }

    if (checkedRadio > 0 && error === 0) {
        launchConfirmation()
    }
});

function checkMinlength(element) {
    element.minLength = validationRules[element.id].minLength.min;
    if (!element.value.length || element.value.length < element.minLength) {
        error++;
        element.parentElement.dataset.errorVisible = true;
        element.parentElement.dataset.error = validationRules[element.id].minLength.messageError;
    } else {
        element.parentElement.dataset.errorVisible = false;
        delete element.parentElement.dataset.error;
    }
}

function checkMinMaxNumber(element) {
    element.min = validationRules[element.id].minNumber.min;
    element.max = validationRules[element.id].maxNumber.max;
    if (!element.value.length || Number(element.value) < Number(element.min) || Number(element.value) > Number(element.max)) {
        error++;
        element.parentElement.dataset.errorVisible = true;

        if (Number(element.value) < Number(element.min)) {
            element.parentElement.dataset.error = validationRules[element.id].minNumber.messageError;
        }

        if (Number(element.value) > Number(element.max)) {
            element.parentElement.dataset.error = validationRules[element.id].maxNumber.messageError;
        }
    } else {
        element.parentElement.dataset.errorVisible = false;
        delete element.parentElement.dataset.error;
    }
}

function checkRegex(element) {
    if (element.value != "") {
        let validationMatch = validationRules[element.id].regex.match;

        if (!validationMatch.test(element.value)) {
            element.parentElement.dataset.errorVisible = true;
            element.parentElement.dataset.error = validationRules[element.id].regex.messageError;
            error++;
        } else {
            element.parentElement.dataset.errorVisible = false;
            delete element.parentElement.dataset.error;
        }
    }
}

function checkMaxDate(element) {
    let dateChoice = element.value.split('-').join('');
    let dateMax = element.max.split('-').join('');

    if (dateChoice > dateMax) {
        element.parentElement.dataset.errorVisible = true;
        element.parentElement.dataset.error = validationRules[element.id].maxDate.messageError;
        error++;
    } else {
        element.parentElement.dataset.errorVisible = false;
        delete element.parentElement.dataset.error;
    }
}

function setMaxDate() {
    let dateNow = new Date();
    let actualYear = dateNow.getFullYear();
    let actualMonth = dateNow.getMonth() + 1;
    let actualMonthComplete = getCompleteMonth(actualMonth);
    let actualDay = dateNow.getDate();
    let actualDayComplete = getCompleteDay(actualDay);
    return `${actualYear}-${actualMonthComplete}-${actualDayComplete}`;
}

function getCompleteDay(day) {
    if (day < 10) {
        return `0${day}`
    } else {
        return day
    }
}

function getCompleteMonth(month) {
    if (month < 10) {
        return `0${month}`
    } else {
        return month
    }
}

function checkChecked(element) {
    if (!element.checked) {
        element.parentElement.parentElement.dataset.errorVisible = true;
        element.parentElement.parentElement.dataset.error = validationRules[element.id].require.messageError;
    } else {
        element.parentElement.parentElement.dataset.errorVisible = false;
        delete element.parentElement.parentElement.dataset.error;
    }
}

function checkCheckedRadio(element) {
    let check = 0;
    for (let i = 0; i < element.children.length; i++) {
        let elementChild = element.children[i].children;
        Object.values(elementChild).forEach(value => {
            if (value.tagName == "INPUT") {
                if (value.checked) {
                    check++;
                }
            }
        });
    }
    if (check == 0) {
        console.log("Not checked");
        element.dataset.errorVisible = true;
        element.dataset.error = validationRules[element.id].require.messageError;
    } else {
        console.log("Checked");
        element.dataset.errorVisible = false;
        delete element.dataset.error;
    }
}

function launchConfirmation() {
    modalBody.style.display = "none";
    confirmationContent.style.display = "flex";
    error = 0;
    document.reserve.reset();
}