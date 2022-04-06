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
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const checkboxCGU = document.getElementById("checkbox1");
const radioInputs = document.querySelectorAll(".radio-input");
const checkboxInputs = document.querySelectorAll(".checkbox-input");
let error = 0;
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
    birthdate.max = setMaxDate();
    document.getElementById("checkbox1").required = true;

    // first.addEventListener('change', onChangeValue);
    // last.addEventListener('change', onChangeValue);
    // email.addEventListener('change', onChangeValue);
    // birthdate.addEventListener('change', onChangeValue);
    // quantity.addEventListener('change', onChangeValue);

    // radioInputs.forEach(radioInput => {
    //     radioInput.addEventListener('change', verifCheck);
    // });
    // checkboxInputs.forEach(checkboxInput => {
    //     checkboxInput.addEventListener('change', verifCheck);
    // });
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
    // 'location1': {
    //     messageError: "Merci de choisir un lieu",
    // },
    // 'location2': {
    //     messageError: "Merci de choisir un lieu",
    // },
    // 'location3': {
    //     messageError: "Merci de choisir un lieu",
    // },
    // 'location4': {
    //     messageError: "Merci de choisir un lieu",
    // },
    // 'location5': {
    //     messageError: "Merci de choisir un lieu",
    // },
    // 'location6': {
    //     messageError: "Merci de choisir un lieu",
    // },
    'checkbox1': {
        check: {
            checked: true,
            messageError: "Merci de cocher cette case"
        }
    }
}

// function validate
modalBody.addEventListener('submit', function(event) {
    event.preventDefault();
    // console.log(event.target);
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
            inputs[i].parentElement.dataset.errorVisible = true;
            inputs[i].parentElement.dataset.error = "Merci de compléter ce champ";
        }

        if (inputs[i].type == "radio") {
            if (inputs[i].checked) {
                checkedRadio++;
            }

            if (checkedRadio > 0) {
                inputs[i].parentElement.parentElement.dataset.errorVisible = false;
                delete inputs[i].parentElement.parentElement.dataset.error;
            } else {
                inputs[i].parentElement.parentElement.dataset.errorVisible = true;
                inputs[i].parentElement.parentElement.dataset.error = "Merci de choisir un lieu";
            }
        }

        for (let firstRule in validationRules) {
            if (inputs[i].id == firstRule) {
                switch (firstRule) {
                    case 'first':
                        checkMinlength(first);
                        checkRegex(first);
                        console.log("error first", error);
                        break;

                    case 'last':
                        checkMinlength(last);
                        checkRegex(last);
                        console.log("error last", error);
                        break;

                    case 'email':
                        checkRegex(email);
                        console.log("error email", error);
                        break;

                    case 'birthdate':
                        checkRegex(birthdate);
                        checkMaxDate(birthdate);
                        console.log("error birthdate", error);
                        break;

                    case 'quantity':
                        checkMinMaxNumber(quantity);
                        checkRegex(quantity);
                        console.log("error quantity", error);
                        break;

                    case 'checkbox1':
                        checkChecked(checkbox1);
                        console.log("error checkbox1", error);
                        break;

                    default:
                        break;
                }
            }
        }
    }

    // for (let firstRule in validationRules) {
    //     if (firstRule == "first") {
    //         // console.log("firstRule ", firstRule, ":", validationRules[firstRule]);
    //         for (let secondRule in validationRules[firstRule]) {
    //             if (secondRule == "minLength") {
    //                 console.log("secondRule ", secondRule, ":", validationRules[firstRule][secondRule]);
    //                 console.error(validationRules[firstRule][secondRule].messageError)
    //                     // for (const thirdRule in validationRules[firstRule][secondRule]) {
    //                     //     console.log("thirdRule ", thirdRule, ":", validationRules[firstRule][secondRule][thirdRule]);
    //                     // }
    //             }
    //         }
    //     }
    // }

    console.log("error submit", error);
    console.log("checkedRadio", checkedRadio);

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
            // validation += 0;
        } else {
            element.parentElement.dataset.errorVisible = false;
            delete element.parentElement.dataset.error;
            // validation++;
        }
    }
}

function checkMaxDate(element) {
    // element.max = validationRules[element.id].maxDate.max;
    let dateChoice = element.value.split('-').join('');
    let dateMax = element.max.split('-').join('');
    console.log(dateChoice, dateMax);

    if (dateChoice > dateMax) {
        // console.error("error");
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
    // console.log("dateNow : ", dateNow);
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
    // if (event.target.id == "checkbox1") {
    if (!element.checked) {
        element.parentElement.parentElement.dataset.errorVisible = true;
        element.parentElement.parentElement.dataset.error = validationRules[element.id].check.messageError;
    } else {
        element.parentElement.parentElement.dataset.errorVisible = false;
        delete element.parentElement.parentElement.dataset.error;
    }
    // }
}

// function onChangeValue(event) {
//     if (event.target.id == "birthdate") {
//         if (event.target.value != "") {
//             validation++;
//         }
//     }

//     let validationMatch = validationRules[event.target.id].match;

//     if (!validationMatch.test(event.target.value)) {
//         event.target.parentElement.dataset.errorVisible = true;
//         event.target.parentElement.dataset.error = validationRules[event.target.id].messageError;
//         validation += 0;
//     } else {
//         event.target.parentElement.dataset.errorVisible = false;
//         delete event.target.parentElement.dataset.error;
//         validation++;
//     }
// }

// function verifCheck(event) {
//     if (event.target.checked) {
//         validation++;
//     }

//     if (event.target.id == "checkbox1") {
//         if (!event.target.checked) {
//             event.target.parentElement.parentElement.dataset.errorVisible = true;
//             event.target.parentElement.parentElement.dataset.error = "Merci de cocher cette case";
//         } else {
//             event.target.parentElement.parentElement.dataset.errorVisible = false;
//             delete event.target.parentElement.parentElement.dataset.error;
//         }
//     }
// }

function launchConfirmation() {
    modalBody.style.display = "none";
    confirmationContent.style.display = "flex";
    // validation = 0;
    error = 0;
    document.reserve.reset();
}