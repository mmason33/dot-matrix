/**
 * @class DotMatrix
 * @param {Node} rootSvg - The svg to append the dots too => root element of the matrix
 * @param {Number} spacing - The spacing between coordinates of dots
 * @param {Number} padding - The padding on the outside of the svg container
 * @param {Number} colPaddingAdjust - The padding adjustment used to calculate columns with given a specific width
 * @param {Number} rowPaddingAdjust - The padding adjustment used to calculate row with given a specific height
 * @param {String} svgBackgroundColor - The background color of the whole svg
 * @param {Number} DISTANCE_TO_FEAR - The threshold of when the dot will fear and run away from the mouse
 * @param {Number} DISTANCE_TO_STEP - The size of the initial step away from the mouse once in the fear zone
 * @param {Number} DELAY_BEFORE_GOING_HOME - The animation delay before returning back home -> in milleseconds
 * @param {Number} DOT_RADIUS - Radius of the dots
 * @param {String} DOT_FILL_COLOR - The fill color of the dot -> default is random
 * @param {String} CSS_CLASS_GOING_HOME - The class to animate the dot going home -> also used in the style tag injection
 * @property {Object} duration - Object to contain fromHome and backHome animation duration properties
 * @property {String} fromHome - The animation duration fromHome or away from the mouse
 * @property {String} backHome - The animation duration backHome or when the dots returns to it's original position
 * @property {Object} timing - Object to contain fromHome and backHome animation timing properties
 * @property {String} fromHome - The animation timing fromHome or away from the mouse
 * @property {String} backHome - The animation timing backHome or when the dots returns to it's original position
 * @param {Number} width - The specified width of the svg container
 * @param {Number} height - The specified height of the svg container
 * @param {Number} rows - The specified rows of the svg container
 * @param {Number} columns - The specified columns of the svg container
 */
class DotMatrix {
    constructor(rootSvg, args) {
        this.rootSvg = rootSvg;
        this.spacing = args.spacing || 0;
        this.padding = args.padding || 0;
        this.colPaddingAdjust = 0;
        this.rowPaddingAdjust = 0;
        this.svgBackgroundColor = args.svgBackgroundColor || 'lightgrey';
        this.DISTANCE_TO_FEAR = args.DISTANCE_TO_FEAR || 50;
        this.DISTANCE_TO_STEP = args.DISTANCE_TO_STEP || 10;
        this.DELAY_BEFORE_GOING_HOME = args.DELAY_BEFORE_GOING_HOME == false ? false : args.DELAY_BEFORE_GOING_HOME || 500;
        this.DOT_RADIUS = args.DOT_RADIUS || 2;
        this.DOT_FILL_COLOR = args.DOT_FILL_COLOR || 'random';
        this.CSS_CLASS_GOING_HOME = args.CSS_CLASS_GOING_HOME || 'animate_going_home';
        this.timing = args.timing || {};
        this.duration = args.duration || {};
        this.duration.fromHome = Object(args.duration).hasOwnProperty('fromHome') ? args.duration.fromHome : '0.1s';
        this.duration.backHome = Object(args.duration).hasOwnProperty('backHome') ? args.duration.backHome : '1s';
        this.timing.fromHome = Object(args.timing).hasOwnProperty('fromHome') ? args.timing.fromHome : 'ease';
        this.timing.backHome = Object(args.timing).hasOwnProperty('backHome') ? args.timing.backHome : 'ease';

        // Is viewport less than or equal to 991
        this.IS_DESKTOP = window.innerWidth >= 992;

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
        console.log(this);
        // If width and height are explicitly set we'll set the dimensions to those else we'll calculate the dimensions of the specified cols and rows
        this.calculated ?
            this.setDimensions(this.width, this.height)
            : this.calculateDimensions();
        this.injectCss();
        this.createMatrix();
        this.handleMouseLeave();
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
                        DISTANCE_TO_FEAR: this.DISTANCE_TO_FEAR,
                        DISTANCE_TO_STEP: this.DISTANCE_TO_STEP,
                        DELAY_BEFORE_GOING_HOME: this.DELAY_BEFORE_GOING_HOME,
                        DOT_RADIUS: this.DOT_RADIUS,
                        DOT_FILL_COLOR: this.DOT_FILL_COLOR === 'random' ? '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6) : this.DOT_FILL_COLOR,
                        CSS_CLASS_GOING_HOME: this.CSS_CLASS_GOING_HOME,
                        IS_DESKTOP: this.IS_DESKTOP,
                    }
                );
            }
        }
    }

    injectCss() {
        const existingStyleTag = document.querySelector('.dot-matrix-style');
        const styleDeclaration = `
            svg {
                background-color: ${this.svgBackgroundColor};
                display: block;
            }
            circle {
                -webkit-transition: ${this.timing.fromHome || 'ease'} transform ${this.duration.fromHome || '0.1s'};
                -webkit-transition: ${this.timing.fromHome || 'ease'} -webkit-transform ${this.duration.fromHome || '0.1s'};
                -o-transition: ${this.timing.fromHome || 'ease'} transform ${this.duration.fromHome || '0.1s'};
                transition: ${this.timing.fromHome || 'ease'} transform ${this.duration.fromHome || '0.1s'};
            }
            circle.animate_going_home {
                -webkit-transition: ${this.timing.backHome || 'ease'} transform ${this.duration.backHome || '1s'};
                -webkit-transition: ${this.timing.backHome || 'ease'} -webkit-transform ${this.duration.backHome || '1s'};
                -o-transition: ${this.timing.backHome || 'ease'} transform ${this.duration.backHome || '1s'};
                transition: ${this.timing.backHome || 'ease'} transform ${this.duration.backHome || '1s'};
            }

        `;

        if (existingStyleTag) {
                existingStyleTag.textContent = styleDeclaration;
                return false;
        }

        const style = document.createElement('style');
        style.classList = 'dot-matrix-style';
        style.textContent = styleDeclaration;
        document.querySelector('head').appendChild(style);
    }

    handleMouseLeave() {
        this.rootSvg.addEventListener('mouseleave', (e) => {
            e.preventDefault();
            e.stopPropagation();

            setTimeout(() => {
                this.rootSvg.dispatchEvent(new MouseEvent('mousemove'));
            }, 500);
        });
    }
}