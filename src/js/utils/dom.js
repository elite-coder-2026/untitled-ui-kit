/**
 * DOM Utility Functions
 */

/**
 * Query selector shorthand
 */
export const $ = (selector, context = document) => context.querySelector(selector);
export const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

/**
 * Add event listener to element(s)
 */
export function on(elements, event, handler, options = {}) {
  const els = typeof elements === 'string' ? $$(elements) : [].concat(elements);
  els.forEach(el => el?.addEventListener(event, handler, options));
}

/**
 * Remove event listener from element(s)
 */
export function off(elements, event, handler, options = {}) {
  const els = typeof elements === 'string' ? $$(elements) : [].concat(elements);
  els.forEach(el => el?.removeEventListener(event, handler, options));
}

/**
 * Add class to element(s)
 */
export function addClass(elements, ...classes) {
  const els = typeof elements === 'string' ? $$(elements) : [].concat(elements);
  els.forEach(el => el?.classList.add(...classes));
}

/**
 * Remove class from element(s)
 */
export function removeClass(elements, ...classes) {
  const els = typeof elements === 'string' ? $$(elements) : [].concat(elements);
  els.forEach(el => el?.classList.remove(...classes));
}

/**
 * Toggle class on element(s)
 */
export function toggleClass(elements, className, force) {
  const els = typeof elements === 'string' ? $$(elements) : [].concat(elements);
  els.forEach(el => el?.classList.toggle(className, force));
}

/**
 * Check if element has class
 */
export function hasClass(element, className) {
  const el = typeof element === 'string' ? $(element) : element;
  return el?.classList.contains(className);
}

/**
 * Get/set data attributes
 */
export function data(element, key, value) {
  const el = typeof element === 'string' ? $(element) : element;
  if (!el) return undefined;

  if (value === undefined) {
    return el.dataset[key];
  }
  el.dataset[key] = value;
}

/**
 * Create element with attributes
 */
export function createElement(tag, attributes = {}, children = []) {
  const el = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'class') {
      el.className = value;
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(el.style, value);
    } else if (key.startsWith('on')) {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      el.setAttribute(key, value);
    }
  });

  children.forEach(child => {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else {
      el.appendChild(child);
    }
  });

  return el;
}

/**
 * Wait for DOM ready
 */
export function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

/**
 * Debounce function
 */
export function debounce(fn, delay = 300) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttle function
 */
export function throttle(fn, limit = 300) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
