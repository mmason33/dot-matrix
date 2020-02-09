# DotMatrx.js
DotMatrix.js is a small, performant class-based library. DotMatrix utilizes SVG(s) instead of canvas for performance and development reasons. SVG(s), CSS3 transitions and JavaScript were used to create the beautiful animations.

## Configurations

`new DotMatrix(rootSVG, args);`

`rootSVG`
| property          | type              | default   | optional   |
| ----------------- |:-----------------:| -----:    | ----------:|
| rootSvg           | node              | undefined | no         |

`args`
| property          | type              | default   | optional   |
| ----------------- | ----------------- | -----     | ---------- |
| height            | number            | undefined | yes        |
| width             | number            | undefined | yes        |
| columns           | number            | 40        | yes        |
| rows              | number            | 40        | yes        |
| animationDelay    | number/boolean    | 500       | yes        |
| distanceToFear    | nunber            | 50        | yes        |
| distanceToStep    | number            | 10        | yes        |
| dotColorPattern   | string            | random    | yes        |
| dotFillColor      | string            | black     | yes        |
| dotRadius         | number            | 5         | yes        |
| dotType           | string            | smart     | yes        |
| padding           | number            | 30        | yes        |
| patternColors | array | ['red','orange','yellow','green','cyan','skyblue','blue','indigo','violet','grey']| yes |
| spacing| number| 30| yes|
| svgBackgroundColor| string| black| yes|
| cssClassGoingHome| string| animate_going_home| yes|
| timing| object| {fromHome: 'ease',backHome: 'ease'}| yes|
| duration| object| {fromHome: 'ease',backHome: 'ease'}| yes|

**LetterDot specific properties**
| property          | type              | default   | optional   |
| ----------------- |:-----------------:| -----:    | ----------:|
| letterFillColor   | string            | white     | yes        |
| wordsList         | array             | undefined | no         |


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