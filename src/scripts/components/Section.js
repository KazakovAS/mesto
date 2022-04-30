export default class Section{
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  addItem(item) {
    // тут и в renderItems до этого было сделано как у тебя в замечаниях, но на прошлом пре было исправлено на это под предлогом "можно лучше"
    const card = this._renderer(item);

    this._containerElement.prepend(card);
  }

  renderItems() {
    this._items.forEach(item => {
      this.addItem(item);
    });
  }
}
