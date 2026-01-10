export class Accordion {
    constructor(elem, opts = {}) {
        this.accordion = elem;
        this.allowMultiple = opts.allowMultiple || false;
        this.init()
    }

    init() {
        const headers = this.accordion.querySelector('.accordion-header');

        headers.forEach(header => {
            header.addEventListener('click', (e) => this.toggle(header))
        })
    }

    toggle(header) {
        const item = header.parentElement
        const content = this.accordion.querySelector('.accordion-content')
        const isActive = item.classList.contains('active')

        if (!this.allowMultiple && !isActive) {
            this.closeAll()
        }

        if (isActive) {
            this.close()
        } else {
            this.open()
        }
    }

    close(item, content) {
        item.classList.remove('active')
        content.style.maxHeight = '0'
    }

    open(item, content) {
        item.classList.add('active')
        content.style.maxHeight = content.scrollHeight + 'px'
    }

    closeAll() {
        const items = document.querySelectorAll('.accordion-item')
        items.forEach(item => {
            const content = this.accordion.querySelector('.accordion-content')
            this.close(item, content)
        })
    }
}