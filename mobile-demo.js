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
            padding: 18,
            spacing: 20,
            height: window.innerHeight,
            width: window.innerWidth,
            svgBackgroundColor: "white",
            dotRadius: 7,
            dotFillColor: "diagonal",
            distanceToFear: 50,
            distanceToStep: 25,
            delayBeforeGoingHome: 500,
            cssClassGoingHome: "animate_going_home",
            timing: {
                fromHome: "ease",
                backHome: "ease"
            },
            duration: {
                fromHome: "0.1s",
                backHome: "1s"
            }
        }
    );
}