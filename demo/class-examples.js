//---------------------------------------------------
// Class with args example
//---------------------------------------------------

const svg = document.querySelector('.some-svg');

// Smart Dot
new DotMatrix(
    svg,
    {
        height: 'number',
        width: 'number',
        rows: 'number',
        columns: 'number',
        animationDelay: 'number',
        distanceToFear: 'number',
        distanceToStep: 'number',
        dotColorPattern: 'string',
        dotFillColor: 'string',
        dotRadius: 'number',
        dotType: 'string',
        padding: 'number',
        patternColors: 'array',
        spacing: 'number',
        svgBackgroundColor: 'string',
        cssClassGoingHome: 'string',
        timing: {
            fromHome: 'string',
            backHome: 'string',
        },
        duration: {
            fromHome: 'string',
            backHome: 'string',
        },
    }
);

// Letter Dot
new DotMatrix(
    svg,
    {
        height: 'number',
        width: 'number',
        rows: 'number',
        columns: 'number',
        animationDelay: 'number',
        distanceToFear: 'number',
        dotColorPattern: 'string',
        dotFillColor: 'string',
        dotRadius: 'number',
        dotType: 'string',
        padding: 'number',
        patternColors: 'array',
        spacing: 'number',
        svgBackgroundColor: 'string',
        // letter specific props
        letterFillColor: 'string',
        wordsList: 'array',
    }
);

// Base Dot
new BaseDot(
    svg,
    {
        dotRadius: 'number',
        dotFillColor: 'string',
        animationDelay: 'number',
        distanceToFear: 'number',
        uniqueIdentifier: 'loop iterator',
        isDesktop: 'boolean',
    }
);

// Extends BaseDot
// -----------------------------------
new SmartDot(
    svg,
    {
        distanceToStep: 'number',
        cssClassGoingHome: 'string',
    }
);

new LetterDot(
    svg,
    {
        dotLetter: 'string',
        letterFillColor: 'string',
    }
);