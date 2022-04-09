export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');

    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    // const popup = document.querySelector('.popup_opened');

    // popup.classList.remove('popup_opened');

    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') this.close();
  }

  setEventListeners() {
    this._popupSelector.addEventListener('click', function (e) {
      if (e.target === this._popupSelector) this.bind(this).close();
      if (e.target.classList.contains('popup__close-button')) this.bind(this).close();
    });
  }
}
