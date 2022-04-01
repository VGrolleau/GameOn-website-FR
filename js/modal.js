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
// let validationForm = false;
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
    // verifType(last);
    // console.log('validation ' + validation + ', validationMax ' + validationMax);

    first.addEventListener('change', onChangeValue);
    last.addEventListener('change', onChangeValue);
    email.addEventListener('change', onChangeValue);
    birthDate.addEventListener('change', onChangeValue);
    quantity.addEventListener('change', onChangeValue);
    // radioInput1.addEventListener('change', verifCheck);
    radioInputs.forEach(radioInput => {
        radioInput.addEventListener('change', verifCheck);
    });
    checkboxInputs.forEach(checkboxInput => {
        checkboxInput.addEventListener('change', verifCheck);
    });

    // for (let i = 0; i < inputs.length; i++) {
    //     console.log(inputs[i]);
    //     console.log(inputs[i].value);
    //     console.log(inputs[i].type);
    //     inputs[i].type == 'text' ? inputs[i].innerText == "null" : inputs[i].value;
    // }

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

        // if (inputs[i].id == "checkbox1") {
        //     if (!inputs[i].checked) {
        //         inputs[i].parentElement.parentElement.dataset.errorVisible = true;
        //         inputs[i].parentElement.parentElement.dataset.error = "Merci de cocher cette case";
        //     } else {
        //         inputs[i].parentElement.parentElement.dataset.errorVisible = false;
        //         delete inputs[i].parentElement.parentElement.dataset.error;
        //     }
        // }
    }

    if (checkedRadio > 0 && checkboxCGU.checked && validation >= validationMax) {
        launchConfirmation()
    }
});

// function validate(event) {
//     event.preventDefault();

//     // console.log('validation ' + validation + ', validationMax ' + validationMax);

//     if (validation >= validationMax) {
//         launchConfirmation()
//     }
// }

function launchConfirmation() {
    modalBody.style.display = "none";
    confirmationContent.style.display = "flex";
    validation = 0;
    console.log('validation ' + validation + ', validationMax ' + validationMax);
    // document.getElementsByTagName('input').forEach(input => {
    //     console.log(input.value)
    // });

    console.log(document.getElementsByTagName('input'));
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
    'text': {
        minLenght: 2,
        match: /^[A-Z][a-z]{1,}$/,
        messageError: 'Le texte doit faire minimum 2 caractères, ne contenir que des lettres, et commencer par une majuscule.'
    },
    'email': {
        match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
        messageError: 'Merci de renseigner un email valide'
    },
    'date': {
        max: setMaxDate(),
        match: /^([0-9]{4}-[0-9]{2}-[0-9]{2})$/,
        messageError: 'Merci de renseigner une date valide'
    },
    'number': {
        min: 0,
        max: 99,
        match: /^([0-99])$/,
        messageError: 'Merci de renseigner un nombre, compris entre 0 et 99'
    }
}

// function verifType(input) {
//     let type = input.type;

//     switch (type) {
//         case 'text':
//             validation = validationRules.text;
//             break;

//         case 'email':
//             validation = validationRules.email;
//             break;

//         case 'number':
//             validation = validationRules.number;
//             break;

//         default:
//             break;
//     }
//     console.log(validation);
// }

function onChangeValue(event) {
    if (event.target.type == "date") {
        if (event.target.value != "") {
            validation++;
            console.log('validation ' + validation + ', validationMax ' + validationMax);
        }
    }

    let validationMatch = validationRules[event.target.type].match;
    console.log(event.target);

    if (!validationMatch.test(event.target.value)) {
        event.target.parentElement.dataset.errorVisible = true;
        event.target.parentElement.dataset.error = validationRules[event.target.type].messageError;
        // return validationForm = false;
        // console.log('validation ' + validation + ', validationMax ' + validationMax);
        validation += 0;
        console.log('validation ' + validation + ', validationMax ' + validationMax);
        // return
    } else {
        event.target.parentElement.dataset.errorVisible = false;
        delete event.target.parentElement.dataset.error;
        // return validationForm = true;
        // validation;
        validation++;
        console.log('validation ' + validation + ', validationMax ' + validationMax);
    }
}

function verifCheck(event) {
    if (event.target.checked) {
        validation++;
        console.log('validation ' + validation + ', validationMax ' + validationMax);
        //     event.target.parentElement.parentElement.dataset.errorVisible = false;
        //     delete event.target.parentElement.parentElement.dataset.error;
        // } else {
        //     console.log("non checked");
        //     event.target.parentElement.parentElement.dataset.errorVisible = true;
        //     event.target.parentElement.parentElement.dataset.error = "Merci de choisir un lieu";
        //     console.log(checkedRadio);
    }



    // if (event.target.type == "radio") {
    //     if (event.target.checked) {
    //         console.log("checked");
    //         checkedRadio++;
    //         console.log(checkedRadio);
    //     }

    //     if (checkedRadio > 0) {
    //         event.target.parentElement.parentElement.dataset.errorVisible = false;
    //         delete event.target.parentElement.parentElement.dataset.error;
    //     } else {
    //         console.log("non checked");
    //         event.target.parentElement.parentElement.dataset.errorVisible = true;
    //         event.target.parentElement.parentElement.dataset.error = "Merci de choisir un lieu";
    //         console.log(checkedRadio);
    //     }
    // }

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