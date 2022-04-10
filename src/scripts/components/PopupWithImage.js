import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open(image, imageCaption) {
    const imageElement = this._popupElement.querySelector('.popup__image');
    const imageCaptionElement = this._popupElement.querySelector('.popup__caption');

    imageElement.src = image;
    imageElement.alt = imageCaption;
    imageCaptionElement.textContent = imageCaption;

    super.open();
  }
}
