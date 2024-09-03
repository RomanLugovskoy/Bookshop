function addToBag(book) {
    let bag = JSON.parse(localStorage.getItem('bag')) || [];
    const index = bag.findIndex(item => item.id === book.id);

    if (index !== -1) {
        bag.splice(index, 1);
        updateButtonState(book, false);
    } else {
        bag.push(book);
        updateButtonState(book, true);
    }
    localStorage.setItem('bag', JSON.stringify(bag));
    updateBagCount();
    updateButtonState();
}

function updateBagCount() {
    const bag = JSON.parse(localStorage.getItem('bag')) || [];
    const bagCountElem = document.getElementById('bag-count');

    if (bagCountElem) {
        bagCountElem.textContent = bag.length;
        bagCountElem.style.display = bag.length > 0 ? 'block' : 'none';
    } else {
        console.error('Element with id "bag-count" not found.');
    }
}

function updateButtonState() {
    const bag = JSON.parse(localStorage.getItem('bag')) || [];
    document.querySelectorAll('.bookItem').forEach(bookItem => {
        const bookId = bookItem.dataset.id;
        const button = bookItem.querySelector('button.book-btn, button.book-btn-in-cart');
        if (!button) {
            console.error('Button not found for book item:', bookItem);
            return;
        }

        const isInCart = bag.some(book => book.id === bookId);

        if (isInCart) {
            button.textContent = 'In the Cart';
            button.classList.add('book-btn-in-cart');
            button.classList.remove('book-btn');
        } else {
            button.textContent = 'Buy Now';
            button.classList.add('book-btn');
            button.classList.remove('book-btn-in-cart');
        }
    });
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('book-btn') || event.target.classList.contains('book-btn-in-cart')) {
        event.preventDefault();

        const bookItem = event.target.closest('.bookItem');

        if (bookItem) {
            const book = {
                id: bookItem.dataset.id,
                title: bookItem.querySelector('.book-title') ? bookItem.querySelector('.book-title').textContent : 'No Title',
                authors: bookItem.querySelector('.book-authors') ? bookItem.querySelector('.book-authors').textContent : 'No Authors',
                price: bookItem.querySelector('.book-retailPrice') ? bookItem.querySelector('.book-retailPrice').textContent : 'No Price',
            };

            addToBag(book);
        } else {
            console.error('Book item not found.');
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    updateBagCount();
    updateButtonState();
});

export { addToBag, updateBagCount, updateButtonState };
