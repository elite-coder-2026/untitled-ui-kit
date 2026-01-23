/**
 * Dropdown Component
 */
export class Dropdown {
  constructor(element, options = {}) {
    this.container = typeof element === 'string' ? document.querySelector(element) : element;
    this.trigger = this.container.querySelector('[data-dropdown-trigger]') || this.container.querySelector('.dropdown-trigger');
    this.menu = this.container.querySelector('[data-dropdown-menu]') || this.container.querySelector('.dropdown-menu');
    this.closeOnSelect = options.closeOnSelect !== false;
    this.closeOnOutsideClick = options.closeOnOutsideClick !== false;

    if (!this.trigger || !this.menu) {
      console.warn('Dropdown: trigger or menu not found');
      return;
    }

    this.init();
  }

  init() {
    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    if (this.closeOnSelect) {
      this.menu.querySelectorAll('a, button').forEach(item => {
        item.addEventListener('click', () => this.close());
      });
    }

    if (this.closeOnOutsideClick) {
      document.addEventListener('click', (e) => {
        if (!this.container.contains(e.target)) {
          this.close();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
        this.trigger.focus();
      }
    });
  }

  open() {
    this.menu.classList.add('is-active');
    this.trigger.setAttribute('aria-expanded', 'true');
  }

  close() {
    this.menu.classList.remove('is-active');
    this.trigger.setAttribute('aria-expanded', 'false');
  }

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  isOpen() {
    return this.menu.classList.contains('is-active');
  }
}

// Auto-init dropdowns
export function initDropdowns() {
  document.querySelectorAll('[data-dropdown]').forEach(el => {
    new Dropdown(el);
  });
}
