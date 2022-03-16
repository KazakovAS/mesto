export default class Card {
  constructor(data) {
    this._name = data.name;
    this._image = data.image;
    this._imageAlt = data.imageAlt;
    this._isLiked = false;
  }
}
