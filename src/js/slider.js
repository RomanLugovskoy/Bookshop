const slides = [
	{
        img: 'img/slider/banner.jpg',
		alt: 'Black friday sale',
	},
	{
        img: 'img/slider/banner2.jpg',
		alt: 'Top 10 books for entrepreneurs',
	},
	{
        img: 'img/slider/banner3.jpg',
		alt: 'Cozy books selection',
	},
];

const imgElem = document.querySelector('.slider-img');
const dots = document.querySelectorAll('.controlls-dot');


let currentIndex = 0;
const changeSlide = (index) => {
	dots.forEach(item => item.classList.remove('dot_active'));
	if (index >= 0 && index <= slides.length - 1) {
		imgElem.src = `${slides[index].img}`;
		imgElem.alt = `${slides[index].alt}`;
		dots[index].classList.add('dot_active');
	} else if (index < 0) {
		currentIndex = slides.length - 1;
		changeSlide(currentIndex);
	} else if (index >= slides.length) {
		currentIndex = 0;
		changeSlide(currentIndex);
	}
};

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        changeSlide(index);
        currentIndex = index;
    });
});

export {changeSlide, imgElem, dots, currentIndex, slides};