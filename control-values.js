const spacing = document.querySelector('input[name="spacing"]');
const padding = document.querySelector('input[name="padding"]');
const fear = document.querySelector('input[name="fear-distance"]');
const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step-distance"]');
const dotRadius = document.querySelector('input[name="dotRadius"]');
const dotFillColor = document.querySelector('input[name="dotFillColor"]');

function getControlValues() {
    const updated_spacing = parseInt(spacing.value);
    const updated_padding = parseInt(padding.value);
    const updated_fear = parseInt(fear.value);
    const updated_delay = parseInt(delay.value);
    const updated_step = parseInt(step.value);
    const updated_dotRadius = parseInt(dotRadius.value);
    const updated_dotFillColor = dotFillColor.value || false;

    const vals = {
        spacing: updated_spacing,
        padding: updated_padding,
        distanceToFear: updated_fear,
        delayBeforeGoingHome: updated_delay,
        distanceToStep: updated_step,
        dotRadius: updated_dotRadius,
        dotFillColor: updated_dotFillColor,
    };

    return vals;
}

function setControlValues(cleanMatrixObject) {
    spacing.setAttribute('value', cleanMatrixObject.spacing);
    padding.setAttribute('value', cleanMatrixObject.padding);
    fear.setAttribute('value', cleanMatrixObject.distanceToFear);
    delay.setAttribute('value', cleanMatrixObject.delayBeforeGoingHome);
    step.setAttribute('value', cleanMatrixObject.distanceToStep);
    dotRadius.setAttribute('value', cleanMatrixObject.dotRadius);
}