export default class Section{
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  addItem(item, position) {
    if (position === 'start') {
      this._containerSelector.prepend(item);
    } else {
      this._containerSelector.append(item);
    }
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}
