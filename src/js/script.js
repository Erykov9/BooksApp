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
    const booksList = document.querySelector('.books-list');


    booksList.addEventListener('dblclick', function (e) {
      e.preventDefault();
      const clicked = e.target;

      if (clicked.offsetParent.classList.contains('book__image')) {
        const dataId = clicked.offsetParent.getAttribute('data-id');
        if (!favoriteBooks.dataId && !clicked.offsetParent.classList.contains('favorite')) {
          favoriteBooks.push(dataId);
          clicked.offsetParent.classList.add('favorite');
        } else {
          const removeIndex = favoriteBooks.indexOf(dataId);
          favoriteBooks.splice(removeIndex, 1);
          clicked.offsetParent.classList.remove('favorite');
        }
      }
    });
  }
  initActions();
}