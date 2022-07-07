{
  'use strict';

  const bookList = dataSource.books;
  const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  const bookClass = document.querySelector('.books-list');

  function renderBooks() {
    const thisBooks = this;

    for (let book in bookList) {
      const HTML = template(book);
      thisBooks.element = utils.createDOMFromHTML(HTML);
      bookClass.appendChild(thisBooks.element);
    }
    
  }
  renderBooks();
}