/*** CREATION FORM BASE ***/

// Firstname div
let firstFormDataDiv = createFormDataDiv();
let labelFirstName = createFormLabel("label", "first", "Prénom");
let inputFirstName = createFormInput("text", "text-control", "first", "first", "", "Prénom");
firstFormDataDiv.appendChild(labelFirstName);
firstFormDataDiv.appendChild(inputFirstName);

// Lastname div
let lastFormDataDiv = createFormDataDiv();
let labelLastName = createFormLabel("label", "last", "Nom");
let inputLastName = createFormInput("text", "text-control", "last", "last", "", "Nom");
lastFormDataDiv.appendChild(labelLastName);
lastFormDataDiv.appendChild(inputLastName);

// Email div
let emailFormDataDiv = createFormDataDiv();
let labelEmail = createFormLabel("label", "email", "Email");
let inputEmail = createFormInput("email", "text-control", "email", "email", "", "Email");
emailFormDataDiv.appendChild(labelEmail);
emailFormDataDiv.appendChild(inputEmail);

// Birthday div
let birthFormDataDiv = createFormDataDiv();
let labelBirth = createFormLabel("label", "birthdate", "Date de naissance");
let inputBirth = createFormInput("date", "text-control", "birthdate", "birthdate", "", "");
birthFormDataDiv.appendChild(labelBirth);
birthFormDataDiv.appendChild(inputBirth);

// Participation div
let participationFormDataDiv = createFormDataDiv();
let labelParticipation = createFormLabel("label", "quantity", "À combien de tournois GameOn avez-vous déjà participé ?");
let inputParticipation = createFormInput("number", "text-control", "quantity", "quantity", "", "");
participationFormDataDiv.appendChild(labelParticipation);
participationFormDataDiv.appendChild(inputParticipation);

// Radio div
let radioFormDataDiv = createFormDataDiv();
let textLabelRadio = createTextLabel("À quel tournoi souhaitez-vous participer cette année ?");
radioFormDataDiv.appendChild(textLabelRadio);

// New York div
let newYorkLabel = createFormLabel("radio-label", "location1", "New York");
let newYorkInput = createFormInput("radio", "radio-input", "location1", "location", "New York", "");
let newYorkDiv = createDiv();
newYorkDiv.appendChild(newYorkInput);
newYorkDiv.appendChild(newYorkLabel);

// San Francisco div
let sanFranciscoLabel = createFormLabel("radio-label", "location2", "San Francisco");
let sanFranciscoInput = createFormInput("radio", "radio-input", "location2", "location", "San Francisco", "");
let sanFranciscoDiv = createDiv();
sanFranciscoDiv.appendChild(sanFranciscoInput);
sanFranciscoDiv.appendChild(sanFranciscoLabel);

// Seattle div
let seattleLabel = createFormLabel("radio-label", "location3", "Seattle");
let seattleInput = createFormInput("radio", "radio-input", "location3", "location", "Seattle", "");
let seattleDiv = createDiv();
seattleDiv.appendChild(seattleInput);
seattleDiv.appendChild(seattleLabel);

// Chicago div
let chicagoLabel = createFormLabel("radio-label", "location4", "Chicago");
let chicagoInput = createFormInput("radio", "radio-input", "location4", "location", "Chicago", "");
let chicagoDiv = createDiv();
chicagoDiv.appendChild(chicagoInput);
chicagoDiv.appendChild(chicagoLabel);

// Boston div
let bostonLabel = createFormLabel("radio-label", "location5", "Boston");
let bostonInput = createFormInput("radio", "radio-input", "location5", "location", "Boston", "");
let bostonDiv = createDiv();
bostonDiv.appendChild(bostonInput);
bostonDiv.appendChild(bostonLabel);

// Portland div
let portlandLabel = createFormLabel("radio-label", "location6", "Portland");
let portlandInput = createFormInput("radio", "radio-input", "location6", "location", "Portland", "");
let portlandDiv = createDiv();
portlandDiv.appendChild(portlandInput);
portlandDiv.appendChild(portlandLabel);

let radioFormRadioDiv = createFormRadioDiv();
radioFormRadioDiv.appendChild(newYorkDiv);
radioFormRadioDiv.appendChild(sanFranciscoDiv);
radioFormRadioDiv.appendChild(seattleDiv);
radioFormRadioDiv.appendChild(chicagoDiv);
radioFormRadioDiv.appendChild(bostonDiv);
radioFormRadioDiv.appendChild(portlandDiv);
radioFormDataDiv.appendChild(radioFormRadioDiv);

// Checkbox div

let checkboxFormDataDiv = createFormDataDiv();
checkboxFormDataDiv.classList.add("formCheckbox");

let cguInput = createFormInput("checkbox", "checkbox-input", "checkbox1", "checkbox1", "", "");
let cguLabel = createFormLabel("checkbox-label", "checkbox1", "J'ai lu et accepte les conditions d'utilisation.");
let cguDiv = createDiv();
cguInput.checked = true;
cguDiv.appendChild(cguInput);
cguDiv.appendChild(cguLabel);

let eventsInput = createFormInput("checkbox", "checkbox-input", "checkbox2", "checkbox2", "", "");
let eventsLabel = createFormLabel("checkbox-label", "checkbox2", "Je souhaite être prévenu des prochains évènements.");
let eventsDiv = createDiv();
eventsDiv.appendChild(eventsInput);
eventsDiv.appendChild(eventsLabel);

checkboxFormDataDiv.appendChild(cguDiv);
checkboxFormDataDiv.appendChild(eventsDiv);

// Submit btn
let submitInput = createFormInput("submit", "btn", "submit-input", "submit", "C'est parti", "");
submitInput.classList.add("btn-submit");


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

function createFormLabel(className, forId, text) {
    let formLabel = document.createElement("label");
    formLabel.classList.add(className);
    formLabel.htmlFor = forId;
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