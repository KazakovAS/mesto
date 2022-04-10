import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector('.form');
    this._popupFormSubmitButton = this._popupForm.querySelector('.form__submit');
    this._handleSubmitForm = handleSubmitForm;
  }

  close() {
    super.close();

    this._popupForm.reset();
  }

  _getFormInputValues() {

  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', this._handleSubmitForm);
  }
}
