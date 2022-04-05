'use strict';

function init() {
  renderBooks();
}

function renderBooks() {
  const books = getBooks();
  const elTable = document.querySelector('tbody');
  const strHtmls = books.map(
    (book) =>
      `<tr>
      <td>${book.id}</td>
      <td>${book.name}</td>
      <td>${formatCurrency(
        getCurrLang() === 'he' ? usdToIls(book.price) : book.price
      )}</td>
      <td><button class="book-action" onclick="onReadBook('${
        book.id
      }')" data-trans='readBtn' >Read</button>
       <button class="book-action" onclick="onBookUpdate('${
         book.id
       }')" data-trans='updateBtn' >Update</button> 
       <button class="book-action" onclick="onBookDelete('${
         book.id
       }')" data-trans='delBtn' >Delete</button></td>
    
      
    </tr>`
  );
  elTable.innerHTML = strHtmls.join('');
}

function onCreateBook() {
  var bookTitle = prompt('Enter a book name');
  var bookPrice = +prompt('Enter a book price');
  var bookImg = prompt('Enter a book Image(URL)');
  const book = addBook(bookTitle, bookPrice, bookImg);
  renderBooks();
  flashMsg(`Book Added (id: ${book.id})`);
  makeTrans();
}

function onReadBook(bookId) {
  var book = getBookById(bookId);
  var elInfoModal = document.querySelector('.info-modal');
  var elInfoContainer = document.querySelector('.info-container');
  elInfoContainer.innerHTML = getBookInfo(book);

  elInfoModal.classList.toggle('modal-open');
}

function onRatingUpdate(bookId, state) {
  var book = getBookById(bookId);
  if (
    (book.bookRating === 0 && state === -1) ||
    (book.bookRating === 10 && state === +1)
  ) {
    document.querySelector('.book-rating').classList.add('wrong-rating');
    setInterval(() => {
      if (
        document
          .querySelector('.book-rating')
          .classList.contains('wrong-rating')
      ) {
        document.querySelector('.book-rating').classList.remove('wrong-rating');
      }
    }, 1000);

    return;
  }
  updateBookRating(bookId, state);
  renderRating(bookId);
}

function onBookUpdate(bookId) {
  var book = getBookById(bookId);
  console.log(book);
  var price = +prompt('Enter a new price', book.price);
  var name = prompt('Enter a new Name', book.name);
  var img = prompt('Enter a new img(url)', book.imgUrl);
  updateBook(bookId, price, name, img);
  renderBooks();
  makeTrans();
}
function onBookDelete(bookId) {
  deleteBook(bookId);
  renderBooks();
}

function flashMsg(msg) {
  const el = document.querySelector('.user-msg');
  el.innerText = msg;
  el.classList.add('open');
  setTimeout(() => {
    el.classList.remove('open');
  }, 3000);
}

function onSetLang(lang) {
  setLang(lang);

  if (lang === 'he') document.body.classList.add('rtl');
  else document.body.classList.remove('rtl');

  makeTrans();
  renderBooks();
}

function usdToIls(price) {
  return price * 3.2;
}
