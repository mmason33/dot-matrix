function mobileDemo({
    svg,
    controls,
    wrapper,
}) {
    controls.remove();
    wrapper.style.margin = 0;

    new DotMatrix(
        svg,
        {
            padding: 15,
            spacing: 20,
            height: window.innerHeight,
            width: window.innerWidth,
            svgBackgroundColor: 'white',
            dotRadius: 6,
            dotFillColor: 'black',
            dotColorPattern: 'diagonal',
            distanceToFear: 30,
            distanceToStep: 15,
            delayBeforeGoingHome: 300,
            cssClassGoingHome: 'animate_going_home',
            timing: {
                fromHome: 'ease',
                backHome: 'ease'
            },
            duration: {
                fromHome: '0.1s',
                backHome: '1s'
            }
        }
    );
}