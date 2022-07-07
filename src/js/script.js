{
  'use strict';

  const bookList = dataSource.books;
  const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  const bookClass = document.querySelector('.books-list');

  function renderBooks() {
    const thisBooks = this;

    for (let book in bookList) {
      const HTML = template(bookList[book]);
      thisBooks.element = utils.createDOMFromHTML(HTML);
      console.log(thisBooks.element);
      bookClass.appendChild(thisBooks.element);
    }
    
  }
  renderBooks();

  const favoriteBooks = [];


  function initActions() {
    const bookImage = document.querySelectorAll('.books-list .book__image');

    for (let book of bookImage) {
      book.addEventListener('dblclick', function(e) {
        e.preventDefault();
        const dataId = book.getAttribute('data-id');

        if(book.getAttribute('class').includes('favorite')) {
          book.classList.remove('favorite');
          const removeIndex = favoriteBooks.indexOf(dataId);
          favoriteBooks.splice(removeIndex, 1);
        } else if (!book.getAttribute('class').includes('favorite')) {
          book.classList.add('favorite');
          favoriteBooks.push(dataId);
        }
      });
    }
  }
  initActions();
}