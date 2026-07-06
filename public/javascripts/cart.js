const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('#sidebar');
function toggleSidebar() {
    sidebar.classList.toggle('collapsed');
}

sidebarToggle.addEventListener('click', toggleSidebar);
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.style.display = 'none';
});

// Wait for the DOM content to fully load
document.addEventListener("DOMContentLoaded", () => {
    // Target the element with the class 'alert'
    const alertBox = document.querySelector('.alert');
    if (alertBox) {
        setTimeout(() => {
            alertBox.style.transition = "opacity 0.5s ease";
            alertBox.style.opacity = "0";
            // Completely remove it from the document layout after it fades out
            setTimeout(() => {
                alertBox.remove();
            }, 500); 
        }, 1500);
    }
});