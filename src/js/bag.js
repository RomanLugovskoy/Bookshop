
function addToBag(book) {
    let bag = JSON.parse(localStorage.getItem('bag')) || [];
    bag.push(book);
    localStorage.setItem('bag', JSON.stringify(bag));
    updateBagCount();
    updateButtonState(book, true);
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

function updateButtonState(book, isInCart) {
    const bookItem = document.querySelector(`.bookItem[data-id="${book.id}"]`);
    if (!bookItem) return;

    const button = bookItem.querySelector('.book-btn');

    if (button) {
        if (isInCart) {
            button.textContent = 'In the Cart';
            button.classList.add('book-btn-in-cart');
            button.classList.remove('book-btn');
        } else {
            button.textContent = 'Buy Now';
            button.classList.add('book-btn');
            button.classList.remove('book-btn-in-cart');
        }
    } else {
        console.error('Button not found.');
    }
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('book-btn')) {
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
document.addEventListener('DOMContentLoaded', updateBagCount);

export {addToBag, updateBagCount, updateButtonState}
