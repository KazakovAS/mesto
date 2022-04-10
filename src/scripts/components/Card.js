export default class Card {
  constructor(data, cardSelector, handleCardImageClick) {
    this._cardTemplate = document.querySelector(cardSelector).content.cloneNode(true);
    this._card = this._cardTemplate.querySelector('.places__item');
    this._cardImageEl = this._card.querySelector('.place__image');
    this._likeButton = this._card.querySelector('.place__like-button');
    this._cardRemoveButton = this._card.querySelector('.place__remove-button');
    this._title = data.name;
    this._image = data.image;
    this._imageAlt = this._title;
    this._isLiked = false;
    this._handleCardImageClick = handleCardImageClick;
  }

  _fillCard() {
    const cardImage = this._card.querySelector('.place__image');
    const cardTitle = this._card.querySelector('.place__name');

    cardTitle.textContent = this._title;
    cardImage.src = this._image;
    cardImage.alt = this._imageAlt;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._checkLikeStatus();
    });

    this._cardRemoveButton.addEventListener('click', () => {
      this._removeCard();
    });

    this._cardImageEl.addEventListener('click', () => {
      this._handleCardImageClick(this._image, this._title);
    });
  }

  _removeCard() {
    this._card.remove();
  }

  _checkLikeStatus() {
    if(this._isLiked) {
      this._setLikeStatusDisabled(this._likeButton);
      this._isLiked = false;
    } else {
      this._setLikeStatusEnabled(this._likeButton);
      this._isLiked = true;
    }
  }

  _setLikeStatusEnabled() {
    this._likeButton.classList.add('place__like-button_active');
  }

  _setLikeStatusDisabled() {
    this._likeButton.classList.remove('place__like-button_active');
  }

  createCard() {
    this._fillCard();
    this._setEventListeners();

    return this._card;
  }
}
