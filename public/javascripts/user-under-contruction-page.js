const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('#sidebar');
function toggleSidebar() {
    sidebar.classList.toggle('collapsed');
}
sidebarToggle.addEventListener('click', toggleSidebar);

sidebarToggle.addEventListener('click', toggleSidebar);
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.style.display = 'none';
});