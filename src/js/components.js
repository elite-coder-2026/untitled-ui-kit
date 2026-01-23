// UI Icon Component - loads SVGs dynamically
class UiIcon extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'size'];
  }

  static basePath = '/src/img/icons/';
  static cache = new Map();

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  get sizes() {
    return {
      xs: 12,
      sm: 16,
      md: 20,
      lg: 24,
      xl: 32,
      '2xl': 40,
    };
  }

  async fetchIcon(name) {
    if (UiIcon.cache.has(name)) {
      return UiIcon.cache.get(name);
    }

    try {
      const response = await fetch(`${UiIcon.basePath}${name}-icon.svg`);
      if (!response.ok) throw new Error('Icon not found');
      const svg = await response.text();
      UiIcon.cache.set(name, svg);
      return svg;
    } catch (e) {
      console.warn(`Icon "${name}" not found`);
      return null;
    }
  }

  async render() {
    const name = this.getAttribute('name');
    const size = this.getAttribute('size') || 'md';
    const iconSize = this.sizes[size] || this.sizes.md;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: ${iconSize}px;
          height: ${iconSize}px;
        }
        svg {
          width: 100%;
          height: 100%;
        }
      </style>
      <span class="icon-placeholder"></span>
    `;

    if (name) {
      const svg = await this.fetchIcon(name);
      if (svg) {
        this.shadowRoot.innerHTML = `
          <style>
            :host {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: ${iconSize}px;
              height: ${iconSize}px;
            }
            svg {
              width: 100%;
              height: 100%;
            }
          </style>
          ${svg}
        `;
      }
    }
  }
}

// Set base path for icons
UiIcon.setBasePath = function(path) {
  UiIcon.basePath = path.endsWith('/') ? path : path + '/';
};

// UI Avatar Component
class UiAvatar extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'src', 'size'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  get sizes() {
    return {
      xs: 24,
      sm: 32,
      md: 40,
      lg: 48,
      xl: 56,
      '2xl': 64,
    };
  }

  getInitials(name) {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  getColor(name) {
    const colors = [
      '#ef4444', '#f97316', '#f59e0b', '#84cc16',
      '#22c55e', '#14b8a6', '#06b6d4', '#0ea5e9',
      '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7',
      '#d946ef', '#ec4899', '#f43f5e'
    ];
    if (!name) return colors[0];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  render() {
    const name = this.getAttribute('name') || '';
    const src = this.getAttribute('src');
    const size = this.getAttribute('size') || 'md';
    const avatarSize = this.sizes[size] || this.sizes.md;
    const fontSize = Math.round(avatarSize * 0.4);
    const initials = this.getInitials(name);
    const bgColor = this.getColor(name);

    const imageContent = src
      ? `<img src="${src}" alt="${name}" />`
      : `<span class="initials">${initials}</span>`;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
        }
        .avatar {
          width: ${avatarSize}px;
          height: ${avatarSize}px;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${src ? '#e5e7eb' : bgColor};
          color: #ffffff;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: ${fontSize}px;
          font-weight: 600;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .initials {
          text-transform: uppercase;
        }
      </style>
      <div class="avatar" title="${name}">
        ${imageContent}
      </div>
    `;
  }
}

// Register custom elements
customElements.define('ui-icon', UiIcon);
customElements.define('ui-avatar', UiAvatar);
