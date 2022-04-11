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
    modalBody.style.display = "inline-block";
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
        require: {
            required: "true",
            messageError: "Merci de compléter ce champ"
        },
        minLength: {
            min: 2,
            messageError: "Le prénom doit faire minimum 2 caractères."
        },
        regex: {
            match: /^([A-Z]{1})([aA-zZ\- ]{1,})$/,
            messageError: 'Le prénom ne doit contenir que des lettres, et commencer par une majuscule.'
        },
    },
    'last': {
        minLength: {
            min: 2,
            messageError: "Le nom doit faire minimum 2 caractères."
        },
        regex: {
            match: /^([A-Z]{1})([aA-zZ\- ]{1,})$/,
            messageError: 'Le nom ne doit contenir que des lettres, et commencer par une majuscule.'
        },
        require: {
            required: true,
            messageError: "Merci de compléter ce champ"
        }
    },
    'email': {
        regex: {
            match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
            messageError: 'Merci de renseigner un email valide.'
        },
        require: {
            required: true,
            messageError: "Merci de compléter ce champ"
        }
    },
    'birthdate': {
        maxDate: {
            max: setMaxDate(),
            messageError: "L'âge minimal requis est de 3 ans."
        },
        regex: {
            match: /^([0-9]{4}-[0-9]{2}-[0-9]{2})$/,
            messageError: 'Merci de renseigner une date valide'
        },
        require: {
            required: true,
            messageError: "Merci de compléter ce champ"
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
            match: /^([\-0-9])+$/,
            messageError: 'Merci de renseigner un nombre'
        },
        require: {
            required: true,
            messageError: "Merci de compléter ce champ"
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

    if (error === 0) {
        launchConfirmation()
    } else {
        error = 0;
    }
});

function checkMinlength(element) {
    let errorMinlength = 0;
    element.minLength = validationRules[element.id].minLength.min;

    if (element.value.length < element.minLength) {
        errorMinlength++;
        element.parentElement.dataset.errorVisible = true;
        element.parentElement.dataset.error = validationRules[element.id].minLength.messageError;
    } else {
        errorMinlength = 0;
        element.parentElement.dataset.errorVisible = false;
        delete element.parentElement.dataset.error;
    }

    error += errorMinlength;
}

function checkMinMaxNumber(element) {
    let errorMinMax = 0;
    element.min = validationRules[element.id].minNumber.min;
    element.max = validationRules[element.id].maxNumber.max;

    if (!element.value.length || Number(element.value) < Number(element.min) || Number(element.value) > Number(element.max)) {
        errorMinMax++;
        element.parentElement.dataset.errorVisible = true;

        if (Number(element.value) < Number(element.min)) {
            element.parentElement.dataset.error = validationRules[element.id].minNumber.messageError;
        }

        if (Number(element.value) > Number(element.max)) {
            element.parentElement.dataset.error = validationRules[element.id].maxNumber.messageError;
        }
    } else {
        errorMinMax = 0;
        element.parentElement.dataset.errorVisible = false;
        delete element.parentElement.dataset.error;
    }

    error += errorMinMax;
}

function checkRegex(element) {
    let errorRegex = 0;
    if (element.value != "") {
        let validationMatch = validationRules[element.id].regex.match;

        if (!validationMatch.test(element.value)) {
            errorRegex++;
            element.parentElement.dataset.errorVisible = true;
            element.parentElement.dataset.error = validationRules[element.id].regex.messageError;
        } else {
            errorRegex = 0
            element.parentElement.dataset.errorVisible = false;
            delete element.parentElement.dataset.error;
        }
    } else {
        element.parentElement.dataset.errorVisible = false;
        delete element.parentElement.dataset.error;
        checkRequire(element);
    }

    error += errorRegex;
}

function checkMaxDate(element) {
    let errorMaxDate = 0;
    let dateChoice = element.value.split('-').join('');
    let dateMax = element.max.split('-').join('');

    if (dateChoice > dateMax) {
        errorMaxDate++;
        element.parentElement.dataset.errorVisible = true;
        element.parentElement.dataset.error = validationRules[element.id].maxDate.messageError;
    } else {
        errorMaxDate = 0;
        element.parentElement.dataset.errorVisible = false;
        delete element.parentElement.dataset.error;
    }

    error += errorMaxDate;
}

function setMaxDate() {
    let dateNow = new Date();
    let yearMinusThree = dateNow.getFullYear() - 3;
    let actualMonth = dateNow.getMonth() + 1;
    let actualMonthComplete = getCompleteMonth(actualMonth);
    let actualDay = dateNow.getDate();
    let actualDayComplete = getCompleteDay(actualDay);
    return `${yearMinusThree}-${actualMonthComplete}-${actualDayComplete}`;
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
    let errorCheck = 0;
    if (!element.checked) {
        errorCheck++;
        element.parentElement.parentElement.dataset.errorVisible = true;
        element.parentElement.parentElement.dataset.error = validationRules[element.id].require.messageError;
    } else {
        errorCheck = 0;
        element.parentElement.parentElement.dataset.errorVisible = false;
        delete element.parentElement.parentElement.dataset.error;
    }
    error += errorCheck;
}

function checkCheckedRadio(element) {
    let check = 0;
    let errorCheckRadio = 0;
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
        errorCheckRadio++;
        element.dataset.errorVisible = true;
        element.dataset.error = validationRules[element.id].require.messageError;
    } else {
        errorCheckRadio = 0;
        element.dataset.errorVisible = false;
        delete element.dataset.error;
    }

    error += errorCheckRadio;
}

function checkRequire(element) {
    let errorRequire = 0;
    element.required = validationRules[element.id].require.required;
    if (element.value == "") {
        errorRequire++;
        element.parentElement.dataset.errorVisible = true;
        element.parentElement.dataset.error = validationRules[element.id].require.messageError;
    } else {
        errorRequire = 0;
        element.parentElement.dataset.errorVisible = false;
        delete element.parentElement.dataset.error;
    }

    error += errorRequire;
}

function launchConfirmation() {
    modalBody.style.display = "none";
    confirmationContent.style.display = "flex";
    error = 0;
    document.reserve.reset();
}