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
        },
        require: {
            required: "true",
            messageError: "Merci de compléter ce champ"
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
            messageError: "La date de naissance ne peut être supérieure à la date actuelle."
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
            match: /^([0-99])$/,
            messageError: 'Merci de renseigner un nombre'
        },
        require: {
            required: true,
            messageError: "Merci de compléter ce champ"
        }
    },
    'radioLocations': {
        checkRadio: {
            required: true,
            messageError: "Merci de choisir un lieu"
        }
    },
    'checkbox1': {
        check: {
            required: true,
            messageError: "Merci de cocher cette case"
        }
    },
    'error': {
        error: null
    }
}

// function validate
modalBody.addEventListener('submit', function(event) {
    event.preventDefault();

    for (const [element, rules] of Object.entries(validationRules)) {
        let domElement = document.getElementById(`${element}`);

        if ('minLength' in rules) {
            checkMinlength(domElement, rules['minLength'].min);
        }
        if ('maxDate' in rules) {
            checkMaxDate(domElement);
        }
        if ('minNumber' in rules && 'maxNumber' in rules) {
            // console.log("Min max");
            checkMinMaxNumber(domElement, rules['minNumber'].min, rules['maxNumber'].max);
        }
        if ('regex' in rules) {
            checkRegex(domElement);
        }
        if ('require' in rules) {
            checkRequire(domElement);
        }
        if ('checkRadio' in rules) {
            checkCheckedRadio(domElement);
            // console.log(rules.checkRadio);
        }
        if ('check' in rules) {
            checkChecked(domElement);
        }
        if ('error' in rules && rules.error != null) {
            domElement.parentElement.dataset.errorVisible = true;
            domElement.parentElement.dataset.error = rules.error;
        } else {
            console.log(domElement);
            domElement.parentElement.dataset.errorVisible = false;
            delete domElement.parentElement.dataset.error;
        }
    }

    console.log(error);

    if (error === 0) {
        launchConfirmation()
    } else {
        error = 0;
    }
});

function checkMinlength(element, min) {
    if (element.value.length < min) {
        validationRules[element.id].error = validationRules[element.id].minLength.messageError;
    }
}

function checkMinMaxNumber(element, min, max) {
    if (Number(element.value) < min || Number(element.value) > max) {
        if (Number(element.value) < min) {
            validationRules[element.id].error = validationRules[element.id].minNumber.messageError;
        }

        if (Number(element.value) > max) {
            validationRules[element.id].error = validationRules[element.id].maxNumber.messageError;
        }
    }
}

function checkRegex(element) {
    if (element.value != "") {
        let validationMatch = validationRules[element.id].regex.match;

        if (!validationMatch.test(element.value)) {
            validationRules[element.id].error = validationRules[element.id].regex.messageError;
        }
        // } else {
        //     checkRequire(element);
    }
}

function checkMaxDate(element) {
    let dateChoice = element.value.split('-').join('');
    let dateMax = element.max.split('-').join('');

    if (dateChoice > dateMax) {
        validationRules[element.id].error = validationRules[element.id].maxDate.messageError;
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
        validationRules[element.id].error = validationRules[element.id].check.messageError;
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
        validationRules[element.id].error = validationRules[element.id].checkRadio.messageError;
    }
}

function checkRequire(element) {
    element.required = validationRules[element.id].require.required;

    if (element.value == "") {
        validationRules[element.id].error = validationRules[element.id].require.messageError;
    }
}

function launchConfirmation() {
    modalBody.style.display = "none";
    confirmationContent.style.display = "flex";
    error = 0;
    document.reserve.reset();
}