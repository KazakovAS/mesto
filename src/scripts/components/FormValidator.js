export default class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;
    this._fields = this._form.querySelectorAll(this._settings.inputSelector);
    this._submitButton = this._form.querySelector(this._settings.submitButtonSelector);
  }

  _setEventListeners() {
    this._fields.forEach(field => {
      field.addEventListener('input', () => {
        this._checkInputValidity(field);
        this.checkSubmitButtonValidity();
      });
    });
  }

  _checkInputValidity(field) {
    if (field.validity.valid) {
      this._hideInputError(field);
    } else {
      this._showInputError(field);
    }
  }

  _hideInputError(field) {
    const errorMessage = this._form.querySelector(`#error-${field.name}`);

    field.classList.remove(this._settings.inputErrorClass);
    errorMessage.classList.remove(this._settings.errorClass);
  }

  _showInputError(field) {
    const errorMessage = this._form.querySelector(`#error-${field.name}`);

    field.classList.add(this._settings.inputErrorClass);

    errorMessage.textContent = field.validationMessage;
    errorMessage.classList.add(this._settings.errorClass);
  }

  checkSubmitButtonValidity() {
    if (this._form.checkValidity()) {
      this._setSubmitButtonEnabled()
    } else {
      this._setSubmitButtonDisabled()
    }
  }

  _setSubmitButtonDisabled() {
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
  }

  _setSubmitButtonEnabled() {
    this._submitButton.disabled = false;
    this._submitButton.classList.remove(this._settings.inactiveButtonClass);
  }

  resetErrors() {
    this._fields.forEach(field => {
      this._hideInputError(field);
    });

    this.checkSubmitButtonValidity();
  }

  enableValidation() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
    this.checkSubmitButtonValidity();
  }
}
