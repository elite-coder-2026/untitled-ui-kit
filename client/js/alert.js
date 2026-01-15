export class Alert {
    constructor(opts = {}) {}

    init() { }

    show(ppts) { }

    close() { }

    clearAll() { }

    getIcon(type) { }

    escapeHTML(text) { }

    success(message, opts = {}) {
        return this.show({ ...opts, type: 'success', message })
    }

    error(message, opts = {}) {

    }
    createAlertElem(id, config) {
        const alert = document.createElement('div')
        alert.id = id;
        alert.className = `alert alert-${config.type} ${alert.className}`

        const icon = this.getIcon(config.type);

        alert.innerHTML = `
            <div class="alert alert-${config.type}">
                
</div>
        `
    }
}