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
let slideInterval;

const changeSlide = (index) => {
    if (index >= slides.length) {
        index = 0;
    } else if (index < 0) {
        index = slides.length - 1;
    }
    dots.forEach(dot => dot.classList.remove('dot_active'));
    dots[index].classList.add('dot_active');
    imgElem.classList.add('fade-out');
    setTimeout(() => {
        imgElem.src = slides[index].img;
        imgElem.alt = slides[index].alt;
        imgElem.classList.remove('fade-out');
    }, 500);

    currentIndex = index;
};

const startAutoSlide = () => {
    slideInterval = setInterval(() => {
        changeSlide(currentIndex + 1);
    }, 5000);
};

const stopAutoSlide = () => {
    clearInterval(slideInterval);
};

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        stopAutoSlide();
        changeSlide(index);
        startAutoSlide();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    changeSlide(currentIndex);
    startAutoSlide();
});

export {changeSlide, startAutoSlide, stopAutoSlide, imgElem, dots, currentIndex, slides, slideInterval};