export default class Card {
  constructor(data, cardSelector, handleCardImageClick, handleCardDeleteClick, handleLikeClick) {
    this._cardTemplate = document.querySelector(cardSelector).content.cloneNode(true);
    this._card = this._cardTemplate.querySelector('.places__item');
    this._cardImageEl = this._card.querySelector('.place__image');
    this._cardCaptionEl = this._card.querySelector('.place__name');
    this._likeButton = this._card.querySelector('.place__like-button');
    this._cardRemoveButton = this._card.querySelector('.place__remove-button');
    this._likeEl = this._card.querySelector('.place__like-count');
    this._title = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._imageAlt = this._title;
    this._handleCardImageClick = handleCardImageClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _fillCard() {
    this._cardCaptionEl.textContent = this._title;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._imageAlt;

    if(this._userId !== this._ownerId) this.hideCardRemoveButton();

    if(this.isLiked()) {
      this.setLikeStatusEnabled();
    }

    this._setLikes();
  }

  hideCardRemoveButton() {
    this._cardRemoveButton.style.display = 'none';
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._id);
    });

    this._cardRemoveButton.addEventListener('click', () => {
      this._handleCardDeleteClick(this._id);
    });

    this._cardImageEl.addEventListener('click', () => {
      this._handleCardImageClick(this._link, this._title);
    });
  }

  removeCard() {
    this._card.remove();
  }

  isLiked() {
    return this._likes.find(user => user._id === this._userId) !== undefined;
  }

  updateLikeCount(newLikes) {
    this._likes = newLikes;

    this._setLikes();
  }

  // index 95
  setLikeStatusEnabled() {
    this._likeButton.classList.add('place__like-button_active');
  }

  setLikeStatusDisabled() {
    this._likeButton.classList.remove('place__like-button_active');
  }

  _setLikes() {
    this._likeEl.textContent = this._likes.length;
  }

  createCard() {
    this._fillCard();
    this._setEventListeners();

    return this._card;
  }
}
