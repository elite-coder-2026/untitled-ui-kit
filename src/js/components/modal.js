/**
 * Modal Component
 */
export class Modal {
  constructor(element, options = {}) {
    this.modal = typeof element === 'string' ? document.querySelector(element) : element;
    this.backdrop = options.backdrop || document.querySelector('.modal-backdrop');
    this.closeOnBackdrop = options.closeOnBackdrop !== false;
    this.closeOnEscape = options.closeOnEscape !== false;
    this.onOpen = options.onOpen || null;
    this.onClose = options.onClose || null;

    this.init();
  }

  init() {
    // Close buttons inside modal
    this.modal.querySelectorAll('[data-modal-close]').forEach(btn => {
      btn.addEventListener('click', () => this.close());
    });

    // Backdrop click
    if (this.backdrop && this.closeOnBackdrop) {
      this.backdrop.addEventListener('click', () => this.close());
    }

    // Escape key
    if (this.closeOnEscape) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen()) {
          this.close();
        }
      });
    }
  }

  open() {
    this.modal.classList.add('is-active');
    if (this.backdrop) {
      this.backdrop.classList.add('is-active');
    }
    document.body.style.overflow = 'hidden';

    if (this.onOpen) {
      this.onOpen(this);
    }
  }

  close() {
    this.modal.classList.remove('is-active');
    if (this.backdrop) {
      this.backdrop.classList.remove('is-active');
    }
    document.body.style.overflow = '';

    if (this.onClose) {
      this.onClose(this);
    }
  }

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  isOpen() {
    return this.modal.classList.contains('is-active');
  }
}

// Auto-init modals with data attributes
export function initModals() {
  document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
    const modalId = trigger.dataset.modalTrigger;
    const modal = document.getElementById(modalId);

    if (modal) {
      const instance = new Modal(modal);
      trigger.addEventListener('click', () => instance.open());
    }
  });
}
