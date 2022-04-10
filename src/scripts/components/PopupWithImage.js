import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector('.popup__image');
    this._imageCaptionElement = this._popupElement.querySelector('.popup__caption');
  }
  open(image, imageCaption) {
    super.open();

    this._imageElement.src = image;
    this._imageElement.alt = imageCaption;
    this._imageCaptionElement.textContent = imageCaption;
  }
}
