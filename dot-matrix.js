class DotMatrix {
    constructor(rootSvg, args) {
        this.rootSvg = rootSvg;
        this.rows = args.rows || 40;
        this.columns = args.columns || 40;
        this.spacing = args.spacing || 20;
        this.padding = args.padding || 50;
        this.svgBackgroundColor = args.svgBackgroundColor || 'lightgrey';
        this.dotConfig = args.dotConfig || {
            DISTANCE_TO_FEAR: 50,
            DISTANCE_TO_STEP: 10,
            DELAY_BEFORE_GOING_HOME: 500,
            DOT_RADIUS: 2,
            CSS_CLASS_GOING_HOME: 'animate_going_home',
        };
        this.transitions = args.transitions || {
            timing: {
                fromHome: '0.1s',
                backHome: '1s',
            },
            duration: {
                fromHome: 'ease',
                backHome: 'ease',
            },
        };

        this.calculateDimensions();
        this.injectCss();
        this.createMatrix();
    }

    calculateDimensions() {
        const dotWidth = this.dotConfig.DOT_RADIUS * 2;
        const numberOfDots = this.columns * this.rows;
        const columnSpacing = this.spacing * (this.columns - 1);
        const rowSpacing = this.spacing * (this.rows - 1);
        const paddingAggregate = this.padding * 2;

        const width = dotWidth + columnSpacing + paddingAggregate;
        const height = dotWidth + rowSpacing + paddingAggregate;

        // Set svg height and width dynamically
        this.rootSvg.setAttribute('width', width);
        this.rootSvg.setAttribute('height', height);
    }

    createMatrix() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                let row = 5;
                let col = 10;
                let coordinate  =   {
                    x: this.padding + this.spacing * j,
                    y: this.padding + this.spacing * i
                }

                new SmartDot(
                    this.rootSvg,
                    {
                        HOME_COORDINATE: coordinate,
                        UNIQUE_IDENTIFIER: i,
                        DISTANCE_TO_FEAR: this.dotConfig.DISTANCE_TO_FEAR,
                        DISTANCE_TO_STEP: this.dotConfig.DISTANCE_TO_STEP,
                        DELAY_BEFORE_GOING_HOME: this.dotConfig.DELAY_BEFORE_GOING_HOME,
                        DOT_RADIUS: this.dotConfig.DOT_RADIUS,
                        CSS_CLASS_GOING_HOME: this.dotConfig.CSS_CLASS_GOING_HOME,
                    }
                );
            }
        }
    }

    injectCss() {
        const style = document.createElement('style');
        style.textContent = `
            svg {
                background-color: ${this.svgBackgroundColor};
                display: block;
            }
            circle {
                transition: ${this.transitions.timing.fromHome || 'ease'} transform ${this.transitions.duration.fromHome || '0.1s'};
            }
            circle.${this.dotConfig.CSS_CLASS_GOING_HOME} {
                transition: ${this.transitions.timing.backHome || 'ease'} transform ${this.transitions.duration.backHome || '1s'};
            }
        `;
        document.querySelector('head').appendChild(style);
    }
}