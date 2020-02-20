const EMAIL_RE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function initializeEvents() {
  const form = document.querySelector(".form");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const password2 = document.getElementById("password2");
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 20);
    checkLength(password, 6, 25);
    checkEmail(email);
    passwordMatch(password, password2);
  });
}

function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function getFieldName(input) {
  return input.id[0].toUpperCase() + input.id.slice(1);
}

function checkEmail(input) {
  if (EMAIL_RE.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid.");
  }
}

function passwordMatch(input, input2) {
  if (input.value !== input2.value) {
    showError(input, "Passwords don't match!");
    showError(input2, "Please type again!");
  }
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} has to be at least ${min} characters.`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must have less than ${max} characters.`
    );
  } else {
    showSuccess(input);
  }
}

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

window.addEventListener("DOMContentLoaded", initializeEvents);
