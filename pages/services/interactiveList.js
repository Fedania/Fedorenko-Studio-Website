//interactiveList.js
export default class InteractiveList {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.items = this.container.querySelectorAll('.item');
    this.init();
  }

  init() {
    this.items.forEach(item => {
      item.addEventListener('click', () => this.toggleItem(item));
    });
  }

  toggleItem(selected) {
    // Collapse all
    this.items.forEach(item => item.classList.remove('expanded'));
    // Expand selected
    selected.classList.add('expanded');
  }
}
