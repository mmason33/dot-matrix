class BaseDot {
    constructor(svg, args) {
        this.svg = svg;
        this.dotRadius = args.dotRadius || 5;
        this.dotFillColor = args.dotFillColor || 'black';
        this.distanceToFear = args.distanceToFear || 50;
        this.animationDelay = args.animationDelay || 500;
        this.uniqueIdentifier = args.uniqueIdentifier;
        this.isDesktop = args.isDesktop;
        this.eventType = this.isDesktop ? 'mousemove' : 'touchmove';

        // Beginning home coordinates => Object passed by reference so the property values need to referenced and retrieved
        this.coordinates = {
            home: {
                x: args.homeCoordinate.x,
                y: args.homeCoordinate.y,
            },
            current: {
                x: args.homeCoordinate.x,
                y: args.homeCoordinate.y,
            },
        };

        this.insertOnDOM();
        this.addEventListeners();
        this.onMouseLeave();
    }

    insertOnDOM() {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        /**
         * RECTS ARE POSSIBLE - TODO: ALLOW RECTANGLES
         * https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect
         */
        circle.classList.add('ease-in');
        circle.setAttribute('cx', this.coordinates.home.x);
        circle.setAttribute('cy', this.coordinates.home.y);
        circle.setAttribute('r', this.dotRadius);
        circle.setAttribute('fill', this.dotFillColor);
        circle.setAttribute('style', 'transform: translate(0px, 0px)');
        this.dot = circle;
        this.svg.appendChild(this.dot);
    }

    addEventListeners() {
        const methodName = `delegate_${this.eventType}`;
        this.svg.addEventListener(this.eventType, this[methodName].bind(this), false);
    }

    respondToInput(coordinate, callbackObject) {
        // Static method
        this.vector_from_mouse_to_me = (new CoordinateTranslator).setCenterCoordinate(coordinate).getVectorToPoint(this.coordinates.current);

        if (!this.isMouseNearMe(this.vector_from_mouse_to_me)) {
            callbackObject.baseState();
            return false;
        }

        callbackObject.alteredState();
    }

    isMouseNearMe(vector_from_mouse_to_me) {
        if (vector_from_mouse_to_me.radius < this.distanceToFear) {
            return true;
        }
        return false;
    }

    onMouseLeave() {
        this.svg.addEventListener('mouseleave', () => {
            this.baseState();
        });
    }
}