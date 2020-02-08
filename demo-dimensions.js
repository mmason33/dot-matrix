function demoDimensions() {
    const controls = document.querySelector('.controls');
    console.log(controls.clientWidth);
    const adjustedWidth = window.innerWidth - controls.clientWidth;
    return adjustedWidth;
}