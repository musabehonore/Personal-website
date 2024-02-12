const form = document.querySelector("form");
const names = document.getElementById("names");
const message = document.getElementById("message");
const namesError = document.querySelector("#names + span.error");
const messageError = document.querySelector("#message + span.error");

names.addEventListener("input", () => {
  if (names.validity.valid) {
    namesError.textContent = "";
    namesError.className = "error";
  } else {
    showNameError();
  }
});

message.addEventListener("input", () => {
  if (message.validity.valid) {
    messageError.textContent = "";
    messageError.className = "error";
  } else {
    showMessageError();
  }
});

form.addEventListener("submit", (event) => {
  if (!names.validity.valid || !message.validity.valid) {
    showNameError();
    showMessageError();
    event.preventDefault();
  }
});

function showNameError() {
  if (names.validity.valueMissing) {
    namesError.textContent = "Your name is needed";
  } else if (names.validity.tooShort) {
    namesError.textContent = `A name should be at least ${names.minLength} characters... you entered ${names.value.length}`;
  }
}

function showMessageError() {
  if (message.validity.valueMissing) {
    messageError.textContent = "Your message is needed";
  } else if (message.validity.tooShort) {
    messageError.textContent = `Message should be at least ${message.minLength} characters... you entered ${message.value.length}`;
  }
}
