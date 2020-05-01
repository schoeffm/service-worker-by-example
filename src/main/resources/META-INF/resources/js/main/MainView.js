export default class MainView extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});
        this.primeWorker = new Worker('js/PrimeWorker.js');
    }

    connectedCallback() {
        customElements
            .whenDefined('main-view')
            .then(_ => this.render())
            .then(_ => this.bind())
    }

    render() {
        this.root.innerHTML =
            `<style>
                main {
                    display: flex;   
                    flex-direction: column;
                    align-items: center;    
                    font-family: "Fira Code Retina",sans-serif;                                 
                }
                main > a-clock,.output { margin: 1rem; }
                main > [type=text] { margin-bottom: 1rem; }
                
                label { display: block; font-style: italic; }
                .explanation { font-style: italic; font-size: smaller;}
                .output { font-weight: bold;}
            </style>
            <main>
                <a-clock></a-clock>
                
                <label for="maxInput">How many prime-numbers do exist up until:</label>                    
                <input id="maxInput" type="text" placeholder="max prime i.e. 1000" value="50000000"/>                
                
                <input type="button" class="webworker" value="Start With WebWorker"/>
                <input type="button" class="mainthread" value="Start In MainThread"/>
                
                <div class="output"></div>    
                <div class="explanation">When clickin' the buttons have a look at the counting clock!</div>
                            
                <input type="button" class="fetch" value="Fetch'n'Process Data from Backend"/>
            </main>`;
    }

    bind() {
        this.maxInput = this.root.querySelector("input[type=text]");
        this.clock = this.root.querySelector("a-clock");
        this.triggerWebWorker = this.root.querySelector("input.webworker");
        this.triggerMainThread = this.root.querySelector("input.mainthread");
        this.triggerFetch = this.root.querySelector("input.fetch");
        this.output = this.root.querySelector(".output");

        this.primeWorker.onmessage = (e) => {
            switch (e.data.type) {
                case 'prime':
                    this._updateOutput(`Prime Numbers up to ${this.maxInput.value}: ${e.data.result.length}`);
                    break;
                case 'fetch':
                    this._updateOutput(`Message from Backend: ${e.data.result}`);
                    break;
            }
            this.clock.stop();
        }
        this.triggerWebWorker.addEventListener('click', () => {
            this.clock.start();
            this.primeWorker.postMessage({max: this.maxInput.value, type: 'prime'});
        });
        this.triggerFetch.addEventListener('click', () => {
            this.clock.start();
            this.primeWorker.postMessage({max: this.maxInput.value, type: 'fetch'});
        })

        this.triggerMainThread.addEventListener('click', () => {
            this.clock.start();
            this._updateOutput(`Prime Numbers up to ${this.maxInput.value}: ${this._primes(this.maxInput.value).length}`);
            this.clock.stop();
        });
    }

    _updateOutput(text) {
        this.output.innerText = text;
    }

    _primes(max = 10) {
        var sieve = [], i, j, primes = [];
        for (i = 2; i <= max; ++i) {
            if (!sieve[i]) {
                // i has not been marked -- it is prime
                primes.push(i);
                for (j = i << 1; j <= max; j += i) {
                    sieve[j] = true;
                }
            }
        }
        return primes;
    }
}

customElements.define('main-view', MainView);