export default class Section{
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  addItem(item) {
    const card = this._renderer(item);

    this._containerElement.prepend(card);
  }

  renderItems() {
    this._items.forEach(item => {
      this.addItem(item);
    });
  }
}
