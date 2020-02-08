class BaseDot {
    constructor(svg, args) {
        this.svg = svg;
        this.dotRadius = args.dotRadius;
        this.dotFillColor = args.dotFillColor
        this.UNIQUE_IDENTIFIER = args.UNIQUE_IDENTIFIER;
        this.IS_DESKTOP = args.IS_DESKTOP;
        this.EVENT_TYPE = this.IS_DESKTOP ? 'mousemove' : 'touchmove';

        // Beginning home coordinates => Object passed by reference so the property values need to referenced and retrieved
        this.coordinates = {
            home: {
                x: args.HOME_COORDINATE.x.toFixed(8),
                y: args.HOME_COORDINATE.y.toFixed(8),
            },
            current: {
                x: args.HOME_COORDINATE.x,
                y: args.HOME_COORDINATE.y,
            },
        };

        this.insertOnDOM();
        this.addEventListeners();
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
        const methodName = `delegate_${this.EVENT_TYPE}`;
        this.svg.addEventListener(this.EVENT_TYPE, this[methodName].bind(this), false);
    }

    respondToInput(coordinate, callbackObject) {
        // Static method
        const vector_from_mouse_to_me = (new CoordinateTranslator).setCenterCoordinate(coordinate).getVectorToPoint(this.coordinates.current);
        console.log(this.isMouseNearMe(vector_from_mouse_to_me));
        if (!this.isMouseNearMe(vector_from_mouse_to_me)) {
            callbackObject.baseState();
            return false;
        }

        callbackObject.textState();

        // this.dot.classList.remove(this.cssClassGoingHome);

        // //  Get Where I Should Go - Absolute Position
        // const move_to_coords_absolute = (new CoordinateTranslator)
        //     .setCenterCoordinate(this.coordinates.current)
        //     .fromPolar(this.distanceToStep, vector_from_mouse_to_me.degrees);

        // //  Get Deltas between current coordinate and home - Relative Position
        // const move_to_coords_relative = (new CoordinateTranslator)
        //     .setCenterCoordinate(this.coordinates.home)
        //     .getVectorToPoint(move_to_coords_absolute);

        // //  Make the change happen on the DOM
        // this.setWhereIShouldBe(move_to_coords_relative, move_to_coords_absolute);
    }

    isMouseNearMe(vector_from_mouse_to_me) {
        if (vector_from_mouse_to_me.radius < this.distanceToFear) {
            return true;
        }
        return false;
    }
}