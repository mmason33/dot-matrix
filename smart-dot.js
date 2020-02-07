class SmartDot {
    constructor(svg, args) {
        this.svg = svg;
        this.DISTANCE_TO_FEAR = args.DISTANCE_TO_FEAR
        this.DISTANCE_TO_STEP = args.DISTANCE_TO_STEP;
        this.DELAY_BEFORE_GOING_HOME = args.DELAY_BEFORE_GOING_HOME;
        this.DOT_RADIUS = args.DOT_RADIUS;
        this.DOT_FILL_COLOR = args.DOT_FILL_COLOR
        this.CSS_CLASS_GOING_HOME = args.CSS_CLASS_GOING_HOME;
        this.UNIQUE_IDENTIFIER = args.UNIQUE_IDENTIFIER;
        this.IS_DESKTOP = args.IS_DESKTOP;
        this.EVENT_TYPE = this.IS_DESKTOP ? 'mousemove' : 'touchmove';

        // Beginning home coordinates => Object passed by reference so the property values need to referenced and retrieved
        this.coordinates = {
            home: {
                x: args.HOME_COORDINATE.x,
                y: args.HOME_COORDINATE.y,
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
        circle.classList.add('ease-in');
        circle.setAttribute('cx', this.coordinates.home.x);
        circle.setAttribute('cy', this.coordinates.home.y);
        circle.setAttribute('r', this.DOT_RADIUS);
        circle.setAttribute('fill', this.DOT_FILL_COLOR);
        circle.setAttribute('transform', 'translate(0, 0)');
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

        this.dot.classList.remove(this.CSS_CLASS_GOING_HOME);
        //  Get Where I Should Go - Absolute Position
        const move_to_coords_absolute = (new CoordinateTranslator)
            .setCenterCoordinate(this.coordinates.current)
            .fromPolar(this.DISTANCE_TO_STEP, vector_from_mouse_to_me.degrees)
            ;
        //  Get Deltas between current coordinate and home - Relative Position
        const move_to_coords_relative = (new CoordinateTranslator)
            .setCenterCoordinate(this.coordinates.home)
            .getVectorToPoint(move_to_coords_absolute)
            ;
        //  Make the change happen on the DOM
        this.setWhereIShouldBe(move_to_coords_relative, move_to_coords_absolute);
    }

    addEventListeners(){
        const methodName = `delegate_${this.EVENT_TYPE}`;
        this.svg.addEventListener(this.EVENT_TYPE ,this[methodName].bind(this),false);
    }

    delegate_touchmove(event){
        // Save our poor CPU
        event.stopPropagation();
        event.preventDefault();
        // console.log(event);	//	Debugging Only
        const touch	=	event.touches[0];
        this.respondToInput({
            x: touch.clientX,
            y: touch.clientY
        });
    }

    delegate_mousemove(event){
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
        if (vector_from_mouse_to_me.radius < this.DISTANCE_TO_FEAR ) {
            return true;
        }
        return false;
    }

    setWhereIShouldBe(delta_coords, absolute_coords) {
        //  Absolute Position
        this.coordinates.current.x = absolute_coords.x;
        this.coordinates.current.y = absolute_coords.y;
        //  Relative Position
        this.dot.setAttribute('transform', `translate(${delta_coords.dx}, ${delta_coords.dy})`);
    }

    goHome() {
        if (this.DELAY_BEFORE_GOING_HOME === false) {
            this.dot.classList.add(this.CSS_CLASS_GOING_HOME);
            this.setWhereIShouldBe({ dx: 0, dy: 0 }, this.coordinates.home);
            return false;
        }

        if (this[`timeout_return_home_${this.UNIQUE_IDENTIFIER}`]) clearTimeout(this[`timeout_return_home_${this.UNIQUE_IDENTIFIER}`]);
        this[`timeout_return_home_${this.UNIQUE_IDENTIFIER}`] = setTimeout((() => {
            this.dot.classList.add(this.CSS_CLASS_GOING_HOME);
            this.setWhereIShouldBe({ dx: 0, dy: 0 }, this.coordinates.home);
        }).bind(this), this.DELAY_BEFORE_GOING_HOME);
    }
}