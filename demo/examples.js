function getExampleConfig(configName, width) {
    window[configName].width = width;
    return window[configName];
}

window.moderate_dots_spacing = {
    padding: 50,
    spacing: 50,
    width: window.adjustedWidth,
    height: window.innerHeight,
    svgBackgroundColor: 'white',
    distanceToFear: 100,
    distanceToStep: 30,
    delayBeforeGoingHome: 200,
    dotRadius: 5,
    dotColorPattern: 'vertical',
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
        'lightgrey',
    ],
    cssClassGoingHome: 'animate_going_home',
    transitions: {
        timing: {
            fromHome: 'ease',
            backHome: 'ease',
        },
        duration: {
            fromHome: '0.1s',
            backHome: '1s',
        },
    },
};

window.tenK_smalls_dots = {
    padding: 10,
    spacing: 10,
    width: window.adjustedWidth,
    height: window.innerHeight,
    svgBackgroundColor: 'white',
    distanceToFear: 100,
    distanceToStep: 30,
    delayBeforeGoingHome: 200,
    dotRadius: 2,
    dotColorPattern: 'random',
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
        'lightgrey',
    ],
    cssClassGoingHome: 'animate_going_home',
    transitions: {
        timing: {
            fromHome: 'ease',
            backHome: 'ease',
        },
        duration: {
            fromHome: '0.1s',
            backHome: '1s',
        },
    },
};

window.spaced_large_dots = {
    padding: 50,
    spacing: 120,
    width: window.adjustedWidth,
    height: window.innerHeight,
    svgBackgroundColor: 'white',
    distanceToFear: 100,
    distanceToStep: 30,
    delayBeforeGoingHome: 200,
    dotRadius: 50,
    dotColorPattern: 'random',
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
        'lightgrey',
    ],
    cssClassGoingHome: 'animate_going_home',
    transitions: {
        timing: {
            fromHome: 'ease',
            backHome: 'ease',
        },
        duration: {
            fromHome: '0.1s',
            backHome: '1s',
        },
    },
};

window.spaced_medium_dots = {
    padding: 50,
    spacing: 50,
    width: window.adjustedWidth,
    height: window.innerHeight,
    svgBackgroundColor: 'white',
    distanceToFear: 50,
    distanceToStep: 30,
    delayBeforeGoingHome: 200,
    dotRadius: 20,
    dotColorPattern: 'horizontal',
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
        'lightgrey',
    ],
    cssClassGoingHome: 'animate_going_home',
    transitions: {
        timing: {
            fromHome: 'ease',
            backHome: 'ease',
        },
        duration: {
            fromHome: '0.1s',
            backHome: '1s',
        },
    },
}

window.dense_group = {
    padding: 50,
    spacing: 20,
    width: window.adjustedWidth,
    height: window.innerHeight,
    svgBackgroundColor: 'white',
    distanceToFear: 25,
    distanceToStep: 10,
    delayBeforeGoingHome: 200,
    dotRadius: 20,
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
        'lightgrey',
    ],
    cssClassGoingHome: 'animate_going_home',
    transitions: {
        timing: {
            fromHome: 'ease',
            backHome: 'ease',
        },
        duration: {
            fromHome: '0.1s',
            backHome: '1s',
        },
    },
};
