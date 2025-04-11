//                         settings object

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

//                         showInputError & hideInputError function

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
};

//                         checkInputValidity function

const checkInputValidity = (formElement, inputElement, config) => {
  console.log(inputElement.validationMessage);
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

//                         hasInvalidInput function

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//                         toggleButtonState function

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, config);
  } else {
    enableButton(buttonElement, config);
  }
};

//                         disableButton function
const disableButton = (buttonElement, config) => {
  buttonElement.setAttribute("disabled", true);
  buttonElement.classList.add(config.inactiveButtonClass);
};

const enableButton = (buttonElement, config) => {
  buttonElement.removeAttribute("disabled");
  buttonElement.classList.remove(config.inactiveButtonClass);
};

//                         resetValidation function

const resetValidation = (formElement, inputList, config) => {
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });
};

//                         setEventListeners function

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  formElement.addEventListener("reset", () => {
    disableButton(buttonElement, config);
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

//                         enableValidation function

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

enableValidation(settings);
