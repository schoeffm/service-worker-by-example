export default class Clock extends HTMLElement {

    constructor() {
        super();
        this.running = false;
        this.root = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        customElements
            .whenDefined('a-clock')
            .then(_ => this.render())
            .then(_ => this.setAttribute("running", false));
    }

    render() {
        this.root.innerHTML = `
            <style>
                .display { font-weight: bold; }
            </style>
            <div class="display"> -- </div>
        `;
        this.display = this.root.querySelector(".display");
    }

    start() {
        if (! this.runningInterval) {
            let start = new Date();
            this.runningInterval = setInterval(() => {
                let seconds = (new Date() - start) / 1000;
                this.display.innerText = `${seconds} sec`
            }, 10);
            this.display.innerText = 0
            this.setAttribute("running", true);
        }
    }
    stop() {
        if (this.runningInterval) {
            clearInterval(this.runningInterval)
            this.runningInterval = undefined;
            this.setAttribute("running", false);
        }
    }
}

customElements.define('a-clock', Clock);