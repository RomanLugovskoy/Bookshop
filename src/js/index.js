import * as slider from "./slider.js";
import * as header from "./header.js";
import * as bag from "./bag.js";

const MAX_RESULTS = 6;

let startIndex = 0;
let currentCategory = 'Architecture';

function fetchBooks(category, startIndex = 0) {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q="subject:${category}"&key=AIzaSyAKonz2kKPQHXtmMwF4OP7K7wCzXCaUgRw&printType=books&startIndex=${startIndex}&maxResults=${MAX_RESULTS}&langRestrict=en`)
        .then(res => res.json())
        .then(data => data.items || []);
}

function renderBook(book) {
    const bookList = document.getElementById('bookList');
    const bookItem = document.createElement('li');
    bookItem.className = 'bookItem';
    bookItem.dataset.id = book.id;

    const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'img/cover/no-cover.jpg';
    const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown author';
    const title = book.volumeInfo.title || 'No title available';
    const description = book.volumeInfo.description ? truncateDescription(book.volumeInfo.description) : 'No description available';
    const rating = book.volumeInfo.averageRating;
    const ratingsCount = book.volumeInfo.ratingsCount;
    const price = book.saleInfo.retailPrice ? `${book.saleInfo.retailPrice.amount} ${book.saleInfo.retailPrice.currencyCode}` : null;
    const isForSale = book.saleInfo.saleability === 'FOR_SALE';

    bookItem.innerHTML = `
        <div class="book-img">
            <img class="shadow" src="${thumbnail}" alt="${title}" height="300">
        </div>
        <div class="book-info">
            <p class="book-authors">${authors}</p>
            <p class="book-title">${title}</p>
            ${rating ? `<div class="book-rating">
                ${renderStars(rating)}
                <p class="book-ratingsCount">${ratingsCount} reviews</p>
            </div>` : ''}
            <p class="book-description">${description}</p>
            ${price ? `<p class="book-retailPrice">${price}</p>` : ''}
            <button class="book-btn base-btn ${isForSale ? '' : 'book-btn-out-of-stock'}">${isForSale ? 'Buy Now' : 'Out of Stock'}</button>
        </div>
    `;

    bookList.appendChild(bookItem);

    if (isForSale) {
        bag.updateButtonState({ id: book.id }, false);
    }
}

function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="star ${i <= rating ? 'active' : ''}">&#9733;</span>`;
    }
    return stars;
}

function truncateDescription(description) {
    const maxLength = 80;
    if (description.length > maxLength) {
        return description.substring(0, maxLength) + '...';
    }
    return description;
}

function init() {
    fetchBooks(currentCategory).then(books => {
        books.forEach(book => renderBook(book));
    });
}

document.getElementById('loadMoreBtn').addEventListener('click', () => {
    startIndex += MAX_RESULTS;
    fetchBooks(currentCategory, startIndex).then(books => {
        books.forEach(book => renderBook(book));
    });
});

document.addEventListener('DOMContentLoaded', () => {
    init();
    updateButtonStates();
});

document.querySelectorAll('.sidebar__item').forEach(item => {
    item.addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelectorAll('.sidebar__item').forEach(i => i.classList.remove('sidebar__item-active'));
        this.classList.add('sidebar__item-active');

        currentCategory = this.textContent;
        startIndex = 0;
        document.getElementById('bookList').innerHTML = '';

        fetchBooks(currentCategory).then(books => {
            books.forEach(book => renderBook(book));
        });
    });
});

function updateButtonStates() {
    const bagItems = JSON.parse(localStorage.getItem('bag')) || [];
    bagItems.forEach(book => {
        bag.updateButtonState(book, true);
    });
}
