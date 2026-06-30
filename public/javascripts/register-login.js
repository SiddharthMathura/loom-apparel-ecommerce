const formValidation = (formId) => {
    const form = document.querySelector(`#${formId}`);
    if (!form) return;
    const inputs = form.querySelectorAll('input');
    const btn = form.querySelector('button[type="submit"]') || form.querySelector('.submit');
    form.addEventListener('input', () => {
        const allInputsFilled = Array.from(inputs).every((input) => input.value.trim() !== '');
        if (allInputsFilled) {
            btn.disabled = false;
            btn.style.cursor = 'pointer';
        } else {
            btn.disabled = true;
            btn.style.cursor = 'not-allowed';
        }
    });
}
formValidation('registerForm');
formValidation('loginForm');

// Check if the page was loaded from the browser's back/forward cache
window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
        // Force a complete page reload from the server
        window.location.reload();
    }
});