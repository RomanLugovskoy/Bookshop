const headerItems = document.querySelectorAll('.header__item');

document.addEventListener('DOMContentLoaded', () => {
	headerItems.forEach(item => {
		item.addEventListener('click', function(event) {
			event.preventDefault();
			headerItems.forEach(i => i.classList.remove('header__item_active'));
			this.classList.add('header__item_active');
		})
	});
})

export {headerItems}