// for slidebar toggle
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('#sidebar');
function toggleSidebar() {
    sidebar.classList.toggle('collapsed');
}
sidebarToggle.addEventListener('click', toggleSidebar);

// for navbar right hide on admin panel
// const navRight = document.querySelector('.nav-right');
// navRight.style.display = 'none';

// // to hide all products on admin panel
// const allProducts = document.querySelector('.allProducts');
// const hideAllProducts = document.querySelector('.products-container');
// const createProducts = document.querySelector('.createProducts');
// const form = document.querySelector('.create-product-container');
// // When clicking "All Products"
// allProducts.addEventListener('click', (event) => {
//     // event.preventDefault();
//     // 1. Show the products container by removing the hide class
//     hideAllProducts.classList.remove('hideAllProducts');
//     // 2. Hide the create form by adding the hide class
//     form.classList.add('hideAllProducts');
// });
// // When clicking "Create Products"
// createProducts.addEventListener('click', (event) => {
//     // event.preventDefault();
//     // 1. Show the create form by removing the hide class
//     form.classList.remove('hideAllProducts');
//     // 2. Hide the products container by adding the hide class
//     hideAllProducts.classList.add('hideAllProducts');
// });

// check for all inputs have value then ---> submit btn is enabled otherwise disabled
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
formValidation('productDetailsForm');

// to delete every product from the db
const deleteAllForm = document.querySelector('#deleteAllForm');
    if (deleteAllForm) {
        deleteAllForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            const userConfirmed = confirm("⚠️ WARNING: Are you absolutely sure you want to delete EVERY product? This action cannot be undone.");
            if (userConfirmed) {
                this.submit();
            }
        });
    }

// Check if the page was loaded from the browser's back/forward cache
window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
        // Force a complete page reload from the server
        window.location.reload();
    }
});