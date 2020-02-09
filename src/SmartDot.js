class SmartDot extends BaseDot {
    constructor(svg, args) {
        super(svg, args);
        this.distanceToStep = args.distanceToStep || 50;
        this.cssClassGoingHome = args.cssClassGoingHome || 'animate_going_home';
    }

    baseState() {
        if (this.animationDelay === false) {
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

        if (this[`timeout_return_home_${this.uniqueIdentifier}`]) clearTimeout(this[`timeout_return_home_${this.uniqueIdentifier}`]);
        this[`timeout_return_home_${this.uniqueIdentifier}`] = setTimeout((() => {
            this.dot.classList.add(this.cssClassGoingHome);
            this.setWhereIShouldBe({ dx: 0, dy: 0 }, this.coordinates.home);
        }).bind(this), this.animationDelay);
    }

    alteredState() {
        // Toggle animation class
        this.dot.classList.remove(this.cssClassGoingHome);

        //  Get Where I Should Go - Absolute Position
        const move_to_coords_absolute = (new CoordinateTranslator)
            .setCenterCoordinate(this.coordinates.current)
            .fromPolar(this.distanceToStep, this.vector_from_mouse_to_me.degrees);

        //  Get Deltas between current coordinate and home - Relative Position
        const move_to_coords_relative = (new CoordinateTranslator)
            .setCenterCoordinate(this.coordinates.home)
            .getVectorToPoint(move_to_coords_absolute);

        //  Make the change happen on the DOM
        this.setWhereIShouldBe(move_to_coords_relative, move_to_coords_absolute);
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
            alteredState: this.alteredState.bind(this),
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
}