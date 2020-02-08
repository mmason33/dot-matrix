function controlsListeners() {
    Array.from(document.querySelectorAll('input')).forEach(input => {
        if (input.type === 'range') {
            input.addEventListener('change', () => {
                document.dispatchEvent(new Event('matrix_reload'));
            });
            return false;
        }

        input.addEventListener('keyup', () => {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                document.dispatchEvent(new Event('matrix_reload'));
            }, 250)
        });
    });

    Array.from(document.querySelectorAll('button')).forEach(button => {
        button.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('matrix_reload', {
                detail: {
                    config: button.classList.value,
                }
            }));
        });
    });
}