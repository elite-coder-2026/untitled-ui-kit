// Dropdown Component
class Dropdown {
  constructor(element) {
    this.dropdown = element;
    this.trigger = element.querySelector('.dropdown-trigger');
    this.menu = element.querySelector('.dropdown-menu');
    this.isOpen = false;

    this.init();
  }

  init() {
    // Toggle on trigger click
    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!this.dropdown.contains(e.target)) {
        this.close();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
        this.trigger.focus();
      }
    });

    // Handle item clicks
    const items = this.menu.querySelectorAll('.dropdown-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        this.close();
      });
    });

    // Keyboard navigation
    this.trigger.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.open();
        this.focusFirstItem();
      }
    });

    this.menu.addEventListener('keydown', (e) => {
      this.handleMenuKeydown(e);
    });
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    this.menu.classList.add('open');
    this.trigger.classList.add('active');
    this.trigger.setAttribute('aria-expanded', 'true');
  }

  close() {
    this.isOpen = false;
    this.menu.classList.remove('open');
    this.trigger.classList.remove('active');
    this.trigger.setAttribute('aria-expanded', 'false');
  }

  focusFirstItem() {
    const firstItem = this.menu.querySelector('.dropdown-item:not(:disabled)');
    if (firstItem) firstItem.focus();
  }

  handleMenuKeydown(e) {
    const items = Array.from(this.menu.querySelectorAll('.dropdown-item:not(:disabled)'));
    const currentIndex = items.indexOf(document.activeElement);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        items[nextIndex].focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        items[prevIndex].focus();
        break;
      case 'Tab':
        this.close();
        break;
    }
  }
}

// Initialize all dropdowns
document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => new Dropdown(dropdown));
});
