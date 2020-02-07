/**
 * @class DotMatrix
 * @param {Node} rootSvg - The svg to append the dots too => root element of the matrix
 * @param {Number} spacing - The spacing between coordinates of dots
 * @param {Number} padding - The padding on the outside of the svg container
 * @param {Number} colPaddingAdjust - The padding adjustment used to calculate columns with given a specific width
 * @param {Number} rowPaddingAdjust - The padding adjustment used to calculate row with given a specific height
 * @param {String} svgBackgroundColor - The background color of the whole svg
 * @param {Object} dotConfig - The config object containing settings for the dot class
 * @param {Object} transitions - The config object containing the setting for animations
 * @param {Number} width - The specified width of the svg container
 * @param {Number} height - The specified height of the svg container
 * @param {Number} rows - The specified rows of the svg container
 * @param {Number} columns - The specified columns of the svg container
 */
class DotMatrix {
    constructor(rootSvg, args) {
        this.rootSvg = rootSvg;
        this.spacing = args.spacing || 20;
        this.padding = args.padding || 0;
        this.colPaddingAdjust = 0;
        this.rowPaddingAdjust = 0;
        this.svgBackgroundColor = args.svgBackgroundColor || 'lightgrey';
        this.dotConfig = args.dotConfig || {
            DISTANCE_TO_FEAR: 50,
            DISTANCE_TO_STEP: 10,
            DELAY_BEFORE_GOING_HOME: 500,
            DOT_RADIUS: 2,
            DOT_FILL_COLOR: 'black',
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

        // Specified dimensions
        this.width = args.width;
        this.height = args.height;
        // If width and height are set in the config calculate the cols and rows
        if (this.width && this.height) this.calculated = this.calculateColumnsAndRows();
        // Ternaries checking for the property "calculated" meaning the width and height were explicitly set
        this.rows = this.calculated ?
            this.calculated.rows :
            args.rows || 40;
        this.columns = this.calculated ?
            this.calculated.columns :
            args.columns || 40;

        // If width and height are explicitly set we'll set the dimensions to those else we'll calculate the dimensions of the specified cols and rows
        this.calculated ?
            this.setDimensions(this.width, this.height)
            : this.calculateDimensions();
        this.injectCss();
        this.createMatrix();
    }

    calculateColumnsAndRows() {
        const widthMinusPadding = this.width - (this.padding * 2);
        const heightMinusPadding = this.height - (this.padding * 2);
        const columns = this.evaluateSpace(widthMinusPadding);
        const rows = this.evaluateSpace(heightMinusPadding);
        this.colPaddingAdjust = this.paddingAdjustment(widthMinusPadding);
        this.rowPaddingAdjust = this.paddingAdjustment(heightMinusPadding);

        return {
            columns,
            rows,
        };
    }

    evaluateSpace(lengthMinusPadding) {
        const quotient = lengthMinusPadding / this.spacing;

        // Checking if there is enough space to render an extra row or column
        // Checking that val is a whole number and not a float
        if (Number.isInteger(quotient)) {
            return quotient + 1;
        }

        return quotient;
    }

    paddingAdjustment(lengthMinusPadding) {

        const quotient = lengthMinusPadding / this.spacing;
        const quotientInt = parseInt(quotient);
        const decimal = ((quotient - quotientInt) / 2) * this.spacing
        return decimal;
    }

    calculateDimensions() {
        const columnSpacing = this.spacing * (this.columns - 1);
        const rowSpacing = this.spacing * (this.rows - 1);
        const paddingAggregate = this.padding * 2;

        const width = columnSpacing + paddingAggregate;
        const height = rowSpacing + paddingAggregate;

        // Set svg height and width dynamically
        this.rootSvg.setAttribute('width', width);
        this.rootSvg.setAttribute('height', height);
    }

    setDimensions(width, height) {
        if (!width || !height) return false;
        this.rootSvg.setAttribute('width', width)
        this.rootSvg.setAttribute('height', height);
    }

    createMatrix() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                let coordinate  =   {
                    x: this.padding + this.colPaddingAdjust + this.spacing * j,
                    y: this.padding + this.rowPaddingAdjust + this.spacing * i
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
                        DOT_FILL_COLOR: this.dotConfig.DOT_FILL_COLOR === 'random' ? '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6) : this.dotConfig.DOT_FILL_COLOR,
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