function matrixReloadEvent(wrapper, config, count) {
    document.addEventListener('matrix_reload', (e) => {
        // Performance
        e.preventDefault();
        e.stopPropagation();

        // Vars from controls
        const values = getControlValues();

        wrapper.style.width = `${window.adjustedWidth}px`;
        wrapper.style.height = `${window.innerHeight}px`;

        // Old svg
        const svg = document.querySelector('.dot-matrix');
        // Remove old svg
        svg.remove();

        // Create new svg, add class and append to wrapper
        const newSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        newSvg.classList = 'dot-matrix';
        wrapper.appendChild(newSvg);

        // Delete old class
        delete window.matrix
        // New Config object
        const configObject = {
            width: window.adjustedWidth,
            height: window.innerHeight,
            padding: values.padding,
            spacing: values.spacing,
            dotRadius: values.dotRadius,
            dotFillColor: values.dotFillColor,
            dotColorPattern: !!values.dotFillColor ? 'fill' : 'diagonal',
            distanceToFear: values.distanceToFear,
            distanceToStep: values.distanceToStep,
            animationDelay: !!values.animationDelay === false ? false : values.animationDelay,
            cssClassGoingHome: 'animate_going_home',
            svgBackgroundColor: values.svgBackgroundColor || 'black',
            timing: {
                fromHome: 'ease',
                backHome: 'ease',
            },
            duration: {
                fromHome: '0.1s',
                backHome: '1s',
            },
        };

        // Kick it off
        window.matrix = new DotMatrix(
            newSvg,
            e.detail ? getExampleConfig(e.detail.config, window.adjustedWidth) : configObject,
        );

        // Clean object
        const updatedCleanedObject = cleanObjectClass(window.matrix);

        // Update control values
        setControlValues(updatedCleanedObject);

        // Print config json and update dot count
        config.innerHTML = JSON.stringify(updatedCleanedObject, undefined, 2);
        count.innerHTML = parseInt(updatedCleanedObject.rows) * parseInt(updatedCleanedObject.columns);
    });
}