/**
 * Untitled UI Kit - Main JavaScript Entry
 */

import { Modal, initModals } from './components/modal.js';
import { Dropdown, initDropdowns } from './components/dropdown.js';
import { $, $$, on, ready } from './utils/dom.js';

// Export components for manual use
export { Modal, Dropdown };

// Export utilities
export * from './utils/dom.js';

// Initialize all components on DOM ready
ready(() => {
  initModals();
  initDropdowns();

  // Demo: Modal functionality for index page
  const openModalBtn = $('#openModal');
  const closeModalBtn = $('#closeModal');
  const cancelModalBtn = $('#cancelModal');
  const modal = $('#modal');
  const backdrop = $('#modalBackdrop');

  if (openModalBtn && modal) {
    const modalInstance = new Modal(modal, { backdrop });

    openModalBtn.addEventListener('click', () => modalInstance.open());
    closeModalBtn?.addEventListener('click', () => modalInstance.close());
    cancelModalBtn?.addEventListener('click', () => modalInstance.close());
  }

  console.log('Untitled UI Kit initialized');
});
