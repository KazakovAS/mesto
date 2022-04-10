import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);

    this._popupForm = this._popupElement.querySelector('.form');
    this._handleSubmitForm = handleSubmitForm;
  }

  close() {
    super.close();

    this._popupForm.reset();
  }

  _getFormInputValues() {
    const inputs = [...this._popupForm.querySelectorAll('.form__field')];
    const values = {};

    inputs.forEach(input => {
      values[input.name] = input.value;
    });

    return values;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', () => {
      this._handleSubmitForm(this._getFormInputValues());
    });
  }
}
