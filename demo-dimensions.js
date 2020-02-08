function demoDimensions() {
    const controls = document.querySelector('.controls');
    const adjustedWidth = window.innerWidth - controls.clientWidth;
    return adjustedWidth;
}