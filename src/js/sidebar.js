const sidebarItems = document.querySelectorAll('.sidebar__item');

document.addEventListener('DOMContentLoaded', () => {
    sidebarItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            sidebarItems.forEach(i => i.classList.remove('sidebar__item-active'));
            this.classList.add('sidebar__item-active');
        });
    });
});
export { sidebarItems };