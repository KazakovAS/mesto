export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupElement.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    this._setEventListenerEscButton();
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    this._removeEventListenerEscButton();
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') this.close();
  }

  _setEventListenerEscButton() {
    document.addEventListener('keydown', this._handleEscClose);
  }

  _removeEventListenerEscButton() {
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popupElement.addEventListener('click', (e) => {
      if (!e.target.closest('.popup__container') || e.target === this._popupCloseButton) this.close();
    });
  }
}
