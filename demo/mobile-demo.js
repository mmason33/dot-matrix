function mobileDemo({
    svg,
    controls,
    wrapper,
}) {
    // Clean up
    controls.remove();
    wrapper.style.margin = 0;

    // Matrix Config
    let config = {
        padding: 15,
        spacing: 20,
        height: window.innerHeight,
        width: window.innerWidth,
        svgBackgroundColor: 'black',
        dotRadius: 6,
        dotFillColor: 'black',
        dotColorPattern: 'diagonal',
        distanceToFear: 30,
        distanceToStep: 15,
        animationDelay: 300,
        cssClassGoingHome: 'animate_going_home',
        timing: {
            fromHome: 'ease',
            backHome: 'ease'
        },
        duration: {
            fromHome: '0.1s',
            backHome: '1s'
        }
    };

    const mobileTrigger = document.querySelector('.mobile-trigger');
    const mobileControls = document.querySelector('.mobile-controls');

    // Setting menu
    mobileTrigger.addEventListener('touchstart', (e) => {
        mobileControls.classList.contains('show') ?
            mobileControls.classList.remove('show') :
            mobileControls.classList.add('show');
    });

    mobileControls.addEventListener('touchstart', (e) => {
        let config;
        const className = e.target.classList.value;

        switch(className) {
            case 'mobile_small_dots':
                config = window[className];
                break;
            case 'mobile_medium_dots':
                config = window[className];
                break;
            case 'mobile_large_dots':
                config = window[className];
                break;
        }

        // Remove old svg
        let svg = document.querySelector('.dot-matrix');
        svg.remove();

        // Create new svg, add class and append to wrapper
        const newSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        newSvg.classList = 'dot-matrix';
        wrapper.appendChild(newSvg);

        // Set new listeners
        setTouchMoveHideSettings(newSvg);

        new DotMatrix(
            newSvg,
            config
        );

        mobileControls.classList.remove('show');
    });

    // Set controls listeners
    setTouchMoveHideSettings(svg);

    // Initial
    new DotMatrix(
        svg,
        config
    );
}

function setTouchMoveHideSettings(svg) {
    const mobileTrigger = document.querySelector('.mobile-trigger');

    svg.addEventListener('touchmove', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // mobileTrigger.classList.contains('hide') ?
        //     mobileTrigger.classList.remove('hide') :
            mobileTrigger.classList.add('hide');
    });

    svg.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // mobileTrigger.classList.contains('hide') ?
        //     mobileTrigger.classList.remove('hide') :
            mobileTrigger.classList.remove('hide');
    });
}