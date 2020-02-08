(() => {
    const controls = document.querySelector('.controls');
    const adjustedWidth = window.innerWidth - controls.clientWidth;
    window.adjustedWidth = adjustedWidth - 76;
    console.log(adjustedWidth);
})();