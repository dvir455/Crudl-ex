'use strict';

const defBooks = [
  {
    id: makeId(),
    name: 'The Next American Revolution',
    price: 55,
    imgUrl:
      'https://images-us.bookshop.org/ingram/9780520272590.jpg?height=500&v=v2',
    bookRating: 0,
  },
  {
    id: makeId(),
    name: 'An Autobiography',
    price: 99,
    imgUrl:
      'https://images-us.bookshop.org/ingram/9781642595680.jpg?height=500&v=v2',
    bookRating: 0,
  },
];

var gBooks = [];
_createBooks();

function getBooks() {
  return gBooks;
}

function addBook(name, price, img) {
  var book = _createBook(name, price, img);
  gBooks.unshift(book);
  _saveBooksToStorage();
  return book;
}

function getBookById(bookId) {
  var book = gBooks.find((book) => book.id === bookId);
  return book;
}

function getBookInfo(book) {
  return `
  <img src="${book.imgUrl}">
  <p class="book-name">${book.name}</p>
  <p class="book-price"> Book Price - <span class="price">${book.price} USD</span></p>
  <button onclick="onRatingUpdate('${book.id}', -1)">➖</button><span class="book-rating">${book.bookRating}</span><button onclick="onRatingUpdate('${book.id}', +1)">➕</button>`;
}
function getBookRating(book) {
  return book.bookRating;
}

function updateBookRating(bookId, dif) {
  var bookIdx = _getBookIdx(bookId);

  gBooks[bookIdx].bookRating += dif;
  _saveBooksToStorage();
}
function renderRating(bookId) {
  var book = getBookById(bookId);
  document.querySelector('.book-rating').innerText = book.bookRating;
}

function updateBook(bookId, price, name, img) {
  var bookIdx = _getBookIdx(bookId);
  console.log(bookIdx);
  gBooks[bookIdx].price = price;
  gBooks[bookIdx].name = `${name}`;
  gBooks[bookIdx].imgUrl = `${img}`;
  _saveBooksToStorage();
}

function deleteBook(bookId) {
  var bookIdx = _getBookIdx(bookId);
  gBooks.splice(bookIdx, 1);
  _saveBooksToStorage();
}

function _getBookIdx(bookId) {
  var bookIdx = gBooks.findIndex((book) => book.id === bookId);
  return bookIdx;
}

function _createBook(name, price, img = `<img src="/img/difu.jpg">`) {
  return {
    id: makeId(),
    name,
    price,
    imgUrl: img,
    bookRating: 0,
  };
}
function _createBooks() {
  var books = loadFromStorage('booksDB');
  if (!books || !books.length) {
    books = [];

    for (let i = 0; i < defBooks.length; i++) {
      var currBook = defBooks[i];
      books.push(_createBook(currBook.name, currBook.price, currBook.imgUrl));
    }
  }
  gBooks = books;
  _saveBooksToStorage();
}
function _saveBooksToStorage() {
  saveToStorage('booksDB', gBooks);
}
