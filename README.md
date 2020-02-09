# DotMatrx.js
![DotMatrixLogo](https://weareenvoy.github.io/dot-matrix/images/dot-matrix-logo-big.png)
DotMatrix.js is a small, performant class-based library. DotMatrix utilizes SVG(s) instead of canvas for performance and development reasons. SVG(s), CSS3 transitions and JavaScript were used to create the beautiful animations.

### Playground
[Configurable Demo](https://weareenvoy.github.io/dot-matrix/)
**Note: LetterDot is not available in the current demo**

### Configurations

`new DotMatrix(rootSVG, args);`

##### rootSVG
| property          | type              | default   | optional   |
| ----------------- |:-----------------:| -----:    | ----------:|
| rootSvg           | node              | undefined | no         |

##### args
| property          | type              | default   | optional   |
| ----------------- | ----------------- | -----     | ---------- |
| height            | number            | undefined | yes        |
| width             | number            | undefined | yes        |
| columns           | number            | 40        | yes        |
| rows              | number            | 40        | yes        |
| animationDelay    | number/boolean    | 500       | yes        |
| distanceToFear    | nunber            | 50        | yes        |
| distanceToStep    | number            | 10        | yes        |
| dotColorPattern   | string            | random - options: random, diagonal, vertical, horizontal, fill    | yes        |
| dotFillColor      | string            | black - options: hex color, color literal     | yes        |
| dotRadius         | number            | 5         | yes        |
| dotType           | string            | smart - options: smart, letter     | yes        |
| padding           | number            | 30        | yes        |
| patternColors | array | ['red','orange','yellow','green','cyan','skyblue','blue','indigo','violet','grey']| yes |
| spacing| number| 30| yes|
| svgBackgroundColor| string| black - options: hex color, color literal | yes|
| cssClassGoingHome| string| animate_going_home| yes|
| timing| object| {fromHome: 'ease',backHome: 'ease'}| yes|
| duration| object| {fromHome: '0.1s',backHome: '1s'}| yes|

##### Example
```javascript

// Entry point SVG
const svg = document.querySelector('.some-svg');

// Full args
new DotMatrix(
    svg,
    {
        padding: 50,
        spacing: 80,
        width: 50,
        height: 50,
        distanceToFear: 100,
        distanceToStep: 10,
        animationDelay: 200,
        dotRadius: 10,
        dotType: 'smart',
        dotFillColor: 'green',
        letterFillColor: 'white',
        dotColorPattern: 'diagonal',
        patternColors: [
            'red',
            'orange',
            'yellow',
            'green',
            'cyan',
            'skyblue',
            'blue',
            'indigo',
            'violet',
            'lightgray',
        ],
        cssClassGoingHome: 'animate_going_home',
        timing: {
            fromHome: 'ease',
            backHome: 'ease',
        },
        duration: {
            fromHome: '0.1s',
            backHome: '1s',
        },
    }
);

// Height and Width => columns and rows dynamically calculated
new DotMatrix(
    svg,
    {
        height: 500,
        width: 500,
    }
);

// Columns and Rows => height and width dynamically calculated
new DotMatrix(
    svg,
    {
        columns: 30,
        rows: 10,
    }
);

// Height and Width take precendent
new DotMatrix(
    svg,
    {
        height: 500,
        width: 500,
        columns: 30,
        rows: 10,
    }
);

```

**LetterDot specific properties**
| property          | type              | default   | optional   |
| ----------------- |:-----------------:| -----:    | ----------:|
| letterFillColor   | string            | white     | yes        |
| wordsList         | array             | undefined | no         |


**Note: At this time dot classes are not intended to be instantiated outside of the DotMatrix class.**

`new BaseDot(rootSVG, args);`
| property          | type              | default   | optional   |
| ----------------- |:-----------------:| -----:    | ----------:|
| dotFillColor      | string            | black     | yes        |
| dotRadius         | number            | 5         | yes        |
| animationDelay    | number/boolean    | 500       | yes        |
| distanceToFear    | nunber            | 50        | yes        |
| uniqueIdentifier  | number/iterator   | undefined | no         |
| isDesktop         | boolean           | undefined | no         |


**Extends BaseDot**

`new SmartDot(rootSVG, args);`
| property          | type              | default   | optional   |
| ----------------- |:-----------------:| -----:    | ----------:|
| distanceToStep    | nunber            | 50        | yes        |
| cssClassGoingHome  | string           | animate_going_home | yes|

`new LetterDot(rootSVG, args);`
| property          | type              | default   | optional   |
| ----------------- |:-----------------:| -----:    | ----------:|
| dotLetter    | string            | undefined        | no        |
| letterFillColor  | string           | white | yes|

### Sizing
Without passing explicit arguments, the DotMatrx will default to **40 columns and 40 rows**. When columns and rows are passed the height and width of the matrix is dynamically calculated. When height and width dimension are passed, columns and rows will be dynamically calculated.