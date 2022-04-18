import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);

    this._popupForm = this._popupElement.querySelector('.form');
    this._inputList = [...this._popupForm.querySelectorAll('.form__field')];
    this._handleSubmitForm = handleSubmitForm;
  }

  close() {
    super.close();

    this._popupForm.reset();
  }

  _getFormInputValues() {
    const values = {};

    this._inputList.forEach(input => {
      values[input.name] = input.value;
    });

    return values;
  }

  changeHandleSubmit(newHandleSubmit) {
    this._handleSubmitForm = newHandleSubmit;
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', () => {
      this._handleSubmitForm(this._getFormInputValues());
    });
  }
}
