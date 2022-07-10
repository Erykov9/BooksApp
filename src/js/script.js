{
  'use strict';

  const bookList = dataSource.books;
  const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  const booksList = document.querySelector('.books-list');
  const filtersCheck = document.querySelector('.filters');

  const favoriteBooks = [];
  const filters = [];


  class BookList {
    constructor () {
      const thisBook = this;

      thisBook.initData();
      thisBook.renderBooks();
      thisBook.initActions();
      thisBook.filtersHide();
      thisBook.determineRatingBgc();
    }

    initData() {
      this.data = dataSource.books;
    }

    renderBooks() {
      const thisBook = this;

      for (let book in bookList) {
        const eachBook = bookList[book];
        const rating = bookList[book].rating;
        const ratingWidth = rating*10;
        const ratingBgc = thisBook.determineRatingBgc(rating);
        eachBook.ratingWidth = ratingWidth;
        eachBook.ratingBgc = ratingBgc;


        const HTML = template(bookList[book]);
        thisBook.element = utils.createDOMFromHTML(HTML);
        booksList.appendChild(thisBook.element);
      }     
    }

    filtersHide() {
      const books = dataSource.books;
      for (let book in books) {
        const bookId = books[book];
        const bookDetails = bookId.details;
        
        let shouldBeHidden = false;

        for (let filter of filters) {
          const filterId = filter;
          if(!bookDetails[filterId]) {
            shouldBeHidden = true;
            break;
          }
        }
        const hiddenBook = document.querySelector('.books-list').querySelector('.book__image' + '[data-id="' + bookId.id + '"]');

        if(shouldBeHidden) {
          hiddenBook.classList.add('hidden');
        } else {
          hiddenBook.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {
      let ratingBgc = '';

      if(rating < 6) {
        ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating < 9) {
        ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating < 10) {
        ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return (ratingBgc);
    }
    

    initActions() {
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

      filtersCheck.addEventListener('click', function(e) {
        const click = e.target;

        if(click.tagName == 'INPUT' && click.type == 'checkbox' && click.name == 'filter') {
          if(click.checked) {
            filters.push(click.value);
          } else {
            const removeIndex = filters.indexOf(click.value);
            filters.splice(removeIndex,1);
          }
        }
      });
    }
  }
  const app = function () {
    new BookList();
  };
  app();
}