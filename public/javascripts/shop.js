const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('#sidebar');
function toggleSidebar() {
    sidebar.classList.toggle('collapsed');
}
sidebarToggle.addEventListener('click', toggleSidebar);