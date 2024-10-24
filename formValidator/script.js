let submitButton = document.getElementById("submit");
let form = document.getElementById("form");
let personName = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmedPassword = document.getElementById("confirm_password");


function showError(input, message) {
    let parentElement = input.parentElement;
    parentElement.className = 'normal-input error';

    let errorMessage = parentElement.querySelector('small');
    errorMessage.innerText = message;
}

function showSuccess(input) {
    let parentElement = input.parentElement;
    parentElement.className = 'normal-input success';
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${input.id} should be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${input.id} should be less than ${min} characters`);
    } else {
        showSuccess(input);
    }
}

function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

function checkConfirmation(input) {
    if (input.value.trim()!=='' && input.value.trim() === password.value.trim()) {
        showSuccess(input);
    } else {
        showError(input, 'Confirm passwords do not match');
    }
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    checkLength(personName, 3, 15);
    checkLength(password, 3, 15);
    checkEmail(email);
    checkConfirmation(confirmedPassword);

})