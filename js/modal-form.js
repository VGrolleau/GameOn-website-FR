// const modalForm = document.querySelector(".modal-body");
let div = createDiv();

// Firstname div
let firstFormDataDiv = createFormDataDiv();
let labelFirstName = createFormLabel("label", "Prénom");
let inputFirstName = createFormInput("text", "text-control", "first", "first", "", "Prénom");
firstFormDataDiv.appendChild(labelFirstName);
firstFormDataDiv.appendChild(inputFirstName);
// modalForm.appendChild(firstFormDataDiv);

// Lastname div
let lastFormDataDiv = createFormDataDiv();
let labelLastName = createFormLabel("label", "Nom");
let inputLastName = createFormInput("text", "text-control", "last", "last", "", "Nom");
lastFormDataDiv.appendChild(labelLastName);
lastFormDataDiv.appendChild(inputLastName);
// modalForm.appendChild(lastFormDataDiv);


function createDiv() {
    let div = document.createElement("div");
    return div;
}

function createFormDataDiv() {
    // let formDataDiv = document.createElement("div");
    let formDataDiv = createDiv();
    // let formDataDiv = div;
    formDataDiv.classList.add("formData");
    return formDataDiv;
}

function createFormLabel(className, text) {
    let formLabel = document.createElement("label");
    formLabel.classList.add(className);
    formLabel.innerText = text;
    return formLabel;
}

function createFormInput(type, className, id, name, value, placeholder) {
    let formInput = document.createElement("input");
    formInput.type = type;
    formInput.classList.add(className);
    formInput.id = id;
    formInput.name = name;
    formInput.value = value;
    formInput.placeholder = placeholder;
    return formInput;
}

function createTextLabel(text) {
    let textLabel = document.createElement("p");
    textLabel.classList.add("text-content");
    textLabel.innerText = text;
    return textLabel;
}

function createFormRadioDiv() {
    let formRadioDiv = createDiv();
    // let formRadioDiv = div;
    formRadioDiv.classList.add("formRadio");
    return formRadioDiv;
}

export function modalFormContent() {
    const modalForm = document.querySelector(".modal-body");
    modalForm.appendChild(firstFormDataDiv);
    modalForm.appendChild(lastFormDataDiv);

    return modalForm;
}