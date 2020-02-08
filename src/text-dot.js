class TextDot extends BaseDot {
    constructor(svg, args) {
        super(svg, args);
        this.dotLetter = 'E';

        this.insertTextElement();
    }

    insertTextElement() {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        const fontSize = parseFloat(this.dotRadius / .3);
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
        text.setAttribute('style', `color: black; font-size:${fontSize}px; opacity: 0;`);
        this.text = text;
        this.svg.appendChild(this.text);
    }

    delegate_touchmove(event) {
        // Save our poor CPU
        event.stopPropagation();
        event.preventDefault();
        // console.log(event);	//	Debugging Only
        const touch = event.touches[0];
        this.respondToInput({
            x: touch.clientX,
            y: touch.clientY
        });
    }

    delegate_mousemove(event) {
        // Save our poor CPU
        event.stopPropagation();
        event.preventDefault();
        // console.log(event.layerX,
        //     event.layerY)
        // this.dot.setAttribute('style', 'opacity: 0');
        // this.text.setAttribute('style', `color: black; font-size:16.6666666px; opacity: 1;`)
        // console.log(event);	//	Debugging Only
        this.respondToInput({
            x: event.layerX,
            y: event.layerY
        }, {
            baseState: () => {
                console.log('baseState');
                this.showDot();
                this.hideText();
            },
            textState: () => {
                console.log('textstate');
                this.hideDot();
                this.showText();
            },
        });
    }

    baseState() {
        this.showDot();
        this.hideText();
    }

    showDot() {
        this.dot.setAttribute('style', 'opacity: 1');
    }

    hideDot() {
        this.dot.setAttribute('style', 'opacity: 0');
    }

    showText() {
        this.text.setAttribute('style', `color: black; font-size:16.6666666px; opacity: 1;`)
    }

    hideText() {
        this.text.setAttribute('style', `color: black; font-size:16.6666666px; opacity: 0;`)
    }
}