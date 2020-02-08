class SmartDot {
    constructor(svg, args) {
        this.svg = svg;
        this.distanceToFear = args.distanceToFear
        this.distanceToStep = args.distanceToStep;
        this.delayBeforeGoingHome = args.delayBeforeGoingHome;
        this.dotRadius = args.dotRadius;
        this.dotFillColor = args.dotFillColor
        this.cssClassGoingHome = args.cssClassGoingHome;
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

    respondToInput(coordinate) {
        // Static method
        const vector_from_mouse_to_me = (new CoordinateTranslator).setCenterCoordinate(coordinate).getVectorToPoint(this.coordinates.current);

        if (!this.isMouseNearMe(vector_from_mouse_to_me)) {
            this.goHome();
            return false;
        }

        this.dot.classList.remove(this.cssClassGoingHome);

        //  Get Where I Should Go - Absolute Position
        const move_to_coords_absolute = (new CoordinateTranslator)
            .setCenterCoordinate(this.coordinates.current)
            .fromPolar(this.distanceToStep, vector_from_mouse_to_me.degrees);

        //  Get Deltas between current coordinate and home - Relative Position
        const move_to_coords_relative = (new CoordinateTranslator)
            .setCenterCoordinate(this.coordinates.home)
            .getVectorToPoint(move_to_coords_absolute);

        //  Make the change happen on the DOM
        this.setWhereIShouldBe(move_to_coords_relative, move_to_coords_absolute);
    }

    addEventListeners() {
        const methodName = `delegate_${this.EVENT_TYPE}`;
        this.svg.addEventListener(this.EVENT_TYPE, this[methodName].bind(this), false);
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
        // console.log(event);	//	Debugging Only
        this.respondToInput({
            x: event.layerX,
            y: event.layerY
        });
    }

    isMouseNearMe(vector_from_mouse_to_me) {
        if (vector_from_mouse_to_me.radius < this.distanceToFear) {
            return true;
        }
        return false;
    }

    setWhereIShouldBe(delta_coords, absolute_coords) {
        //  Absolute Position
        this.coordinates.current.x = absolute_coords.x;
        this.coordinates.current.y = absolute_coords.y;

        //  Relative Position
        this.dot.setAttribute('style', `transform: translate(${delta_coords.dx}px, ${delta_coords.dy}px)`);
    }

    goHome() {
        if (this.delayBeforeGoingHome === false) {
            // Add going home animate
            this.dot.classList.add(this.cssClassGoingHome);

            this.setWhereIShouldBe(
                {
                    dx: 0,
                    dy: 0
                },
                this.coordinates.home
            );

            return false;
        }

        if (this[`timeout_return_home_${this.UNIQUE_IDENTIFIER}`]) clearTimeout(this[`timeout_return_home_${this.UNIQUE_IDENTIFIER}`]);
        this[`timeout_return_home_${this.UNIQUE_IDENTIFIER}`] = setTimeout((() => {
            this.dot.classList.add(this.cssClassGoingHome);
            this.setWhereIShouldBe({ dx: 0, dy: 0 }, this.coordinates.home);
        }).bind(this), this.delayBeforeGoingHome);
    }
}