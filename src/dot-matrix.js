/**
 * @class DotMatrix
 * @param {Node} rootSvg - The svg to append the dots too => root element of the matrix
 * @param {Number} spacing - The spacing between coordinates of dots
 * @param {Number} padding - The padding on the outside of the svg container
 * @param {Number} colPaddingAdjust - The padding adjustment used to calculate columns with given a specific width
 * @param {Number} rowPaddingAdjust - The padding adjustment used to calculate row with given a specific height
 * @param {String} svgBackgroundColor - The background color of the whole svg
 * @param {Number} distanceToFear - The threshold of when the dot will fear and run away from the mouse
 * @param {Number} distanceToStep - The size of the initial step away from the mouse once in the fear zone
 * @param {Number} animationDelay - The animation delay before returning back home -> in milleseconds
 * @param {Number} dotRadius - Radius of the dots
 * @param {String} dotFillColor - The fill color of the dot -> default is random
 * @param {String} cssClassGoingHome - The class to animate the dot going home -> also used in the style tag injection
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
        // Short circuit defaults
        this.args = args;
        this.rootSvg = rootSvg;
        this.colPaddingAdjust = 0;
        this.animationDelay = args.animationDelay == false ? false : args.animationDelay || 500;
        this.distanceToFear = args.distanceToFear || 50;
        this.distanceToStep = args.distanceToStep || 10;
        this.dotFillColor = args.dotFillColor || 'black';
        this.dotRadius = args.dotRadius || 5;
        this.dotType = args.dotType || 'smart';
        this.letterFillColor = args.letterFillColor || 'white';
        this.padding = args.padding || 30;
        this.rowPaddingAdjust = 0;
        this.spacing = args.spacing || 30;
        this.svgBackgroundColor = args.svgBackgroundColor || 'black';
        this.wordsList = args.wordsList || [
            'Some Word',
            'Some Word',
            'Some Word',
            'Some Word',
            'Some Word',
        ];
        this.cssClassGoingHome = args.cssClassGoingHome || 'animate_going_home';
        this.timing = args.timing || {};
        this.duration = args.duration || {};
        this.duration.fromHome = Object(args.duration).hasOwnProperty('fromHome') ? args.duration.fromHome : '0.1s';
        this.duration.backHome = Object(args.duration).hasOwnProperty('backHome') ? args.duration.backHome : '1s';
        this.timing.fromHome = Object(args.timing).hasOwnProperty('fromHome') ? args.timing.fromHome : 'ease';
        this.timing.backHome = Object(args.timing).hasOwnProperty('backHome') ? args.timing.backHome : 'ease';
        this.dotColorPattern = args.dotColorPattern || 'random';
        this.patternColors = args.patternColors || [
            'red',
            'orange',
            'yellow',
            'green',
            'cyan',
            'skyblue',
            'blue',
            'indigo',
            'violet',
            'grey',
        ];

        // Is viewport less than or equal to 991
        this.isDesktop = window.innerWidth >= 992;

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

        return this;
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

                switch(this.dotType) {
                    case 'smart':
                        new SmartDot(this.rootSvg, {
                            homeCoordinate: coordinate,
                            uniqueIdentifier: i,
                            distanceToFear: this.distanceToFear,
                            distanceToStep: this.distanceToStep,
                            animationDelay: this.animationDelay,
                            dotRadius: this.dotRadius,
                            dotFillColor: this.getColor(i, j),
                            cssClassGoingHome: this.cssClassGoingHome,
                            isDesktop: this.isDesktop,
                        });
                        break;
                    case 'letter':
                        const word = this.wordsList[i] || false;

                        new LetterDot(this.rootSvg, {
                            homeCoordinate: coordinate,
                            uniqueIdentifier: i,
                            distanceToFear: this.distanceToFear,
                            animationDelay: this.animationDelay,
                            dotRadius: this.dotRadius,
                            dotFillColor: this.getColor(i, j),
                            dotLetter: word ? word.charAt(j) : false,
                            letterFillColor: this.args.letterFillColor || 'white',
                            isDesktop: this.isDesktop,
                        });
                        break;
                }
            }
        }
    }

    getColor(row, column) {
        let color;
        let startIndex;
        let offsetIndex;
        switch(this.dotColorPattern) {
            case 'fill':
                color = this.dotFillColor;
                break;
            case 'random':
                color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
                break;
            case 'diagonal':
                // Diagonal Rainbow
                startIndex = (column % this.patternColors.length) - (row % this.patternColors.length);
                offsetIndex = startIndex + 1;
                // Pass undefined to wrap array and combat weird slice behavior when startIndex is -1
                color = this.patternColors.slice(startIndex, startIndex == -1 ? undefined : offsetIndex);
                break;
            case 'horizontal':
                // Vertical Rainbow
                startIndex = row % this.patternColors.length;
                offsetIndex =  -1;

                if ( startIndex < this.patternColors.length ) {
                    offsetIndex =  startIndex + 1;
                }

                color = this.patternColors.slice(startIndex,offsetIndex);
                break;
            case 'vertical':
                // Horizontal Rainbow
                startIndex = column % this.patternColors.length;
                offsetIndex =  -1;

                if ( startIndex < this.patternColors.length ) {
                    offsetIndex =  startIndex + 1;
                }

                color = this.patternColors.slice(startIndex,offsetIndex);
        }

        return color;
    }

    injectCss() {
        const existingStyleTag = document.querySelector('.dot-matrix-style');
        const letterDotStyleDeclaration = `
            svg {
                background-color ${this.svgBackgroundColor};
                display: block;
            }

            text {
                transition: ease opacity .5s;
            }

            circle {
                transition: ease opacity 1s;
            }
        `;

        const smartDotStyleDeclaration = `
            svg {
                background-color: ${this.svgBackgroundColor};
                display: block;
            }

            circle,
            text {
                -webkit-transition-timing-function: ${this.timing.fromHome || 'ease'};
                     -o-transition-timing-function: ${this.timing.fromHome || 'ease'};
                        transition-timing-function: ${this.timing.fromHome || 'ease'};
                -webkit-transition-property: -webkit-transform;
                transition-property: -webkit-transform;
                -o-transition-property: transform;
                transition-property: transform;
                transition-property: transform, -webkit-transform;
                -webkit-transition-duration: ${this.duration.fromHome || '0.1s'};
                     -o-transition-duration: ${this.duration.fromHome || '0.1s'};
                        transition-duration: ${this.duration.fromHome || '0.1s'};
            }


            circle.animate_going_home,
            text.animate_going_home {
                -webkit-transition-timing-function: ${this.timing.backHome || 'ease'};
                     -o-transition-timing-function: ${this.timing.backHome || 'ease'};
                        transition-timing-function: ${this.timing.backHome || 'ease'};
                -webkit-transition-property: -webkit-transform;
                transition-property: -webkit-transform;
                -o-transition-property: transform;
                transition-property: transform;
                transition-property: transform, -webkit-transform;
                -webkit-transition-duration: ${this.duration.backHome || '1s'};
                     -o-transition-duration: ${this.duration.backHome || '1s'};
                        transition-duration: ${this.duration.backHome || '1s'};
            }
        `;

        const styleDeclaration = this.dotType === 'smart' ?
            smartDotStyleDeclaration :
            letterDotStyleDeclaration;

        if (existingStyleTag) {
                existingStyleTag.textContent = styleDeclaration;
                return false;
        }

        const style = document.createElement('style');
        style.classList = 'dot-matrix-style';
        style.textContent = styleDeclaration;
        document.querySelector('head').appendChild(style);
    }
}