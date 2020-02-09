class LetterDot extends BaseDot {
    constructor(svg, args) {
        super(svg, args);
        this.dotLetter = args.dotLetter;
        this.letterFillColor = args.letterFillColor || 'white';

        if (this.dotLetter) this.insertTextElement();
    }

    insertTextElement() {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        this.fontSize = parseFloat(this.dotRadius / .3);
        const xOffset = parseFloat(this.coordinates.home.x);
        const yOffset = parseFloat(this.coordinates.home.y) + this.dotRadius;

        /**
         * RECTS ARE POSSIBLE - TODO: ALLOW RECTANGLES
         * https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect
         */
        text.classList.add('ease-in');
        text.setAttribute('x', xOffset);
        text.setAttribute('y', yOffset);
        text.setAttribute('text-anchor', 'middle');
        text.textContent = this.dotLetter;
        text.setAttribute('style', `fill: ${this.letterFillColor}; font-size:${this.fontSize}px; opacity: 0;`);
        this.text = text;
        this.svg.appendChild(this.text);
    }

    delegate_touchmove(event) {
        // Save our poor CPU
        event.stopPropagation();
        event.preventDefault();

        const touch = event.touches[0];
        this.respondToInput({
            x: touch.clientX,
            y: touch.clientY
        }, {
            baseState: this.baseState.bind(this),
            alteredState: () => {
                this.hideDot();
                this.showText();
            },
        });
    }

    delegate_mousemove(event) {
        // Save our poor CPU
        event.stopPropagation();
        event.preventDefault();

        this.respondToInput({
            x: event.layerX,
            y: event.layerY
        }, {
            baseState: this.baseState.bind(this),
            alteredState: this.alteredState.bind(this),
        });
    }

    baseState() {
        // If no text element bail
        if (!this.text) return false;

        if (this.animationDelay === false) {
            this.showDot();
            this.hideText();

            return false;
        }

        if (this[`timeout_return_home_${this.uniqueIdentifier}`]) clearTimeout(this[`timeout_return_home_${this.uniqueIdentifier}`]);
        this[`timeout_return_home_${this.uniqueIdentifier}`] = setTimeout((() => {
            this.showDot();
            this.hideText();
        }).bind(this), this.animationDelay);
    }

    alteredState() {
        if (!this.text) return false;
        this.hideDot();
        this.showText();
    }

    showDot() {
        this.dot.setAttribute('style', 'opacity: 1');
    }

    hideDot() {
        this.dot.setAttribute('style', 'opacity: 0');
    }

    showText() {
        this.text.setAttribute('style', `fill: ${this.letterFillColor}; font-size:${this.fontSize}px; opacity: 1;`)
    }

    hideText() {
        this.text.setAttribute('style', `fill: ${this.letterFillColor}; font-size:${this.fontSize}px; opacity: 0;`)
    }
}