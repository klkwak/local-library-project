function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let booksBorrowed = 0;
  for (let book of books) {
    if (!book.borrows[0].returned) booksBorrowed++;
  }
  return booksBorrowed;
}

// helper function to format temporary object as array of objects
function _formatObjectAsArray(object) {
  return Object.keys(object).map((key) => {
    return {
      name: key,
      count: object[key],
    };
  });
}

// helper function to sort and slice array
function _sortByCountAndSlice(array) {
  return array.sort((itemA, itemB) => itemB.count - itemA.count).slice(0, 5);
}

function getMostCommonGenres(books) {
  const genreCount = {};
  for (let book of books) {
    if (genreCount[book.genre]) {
      genreCount[book.genre]++;
    } else {
      genreCount[book.genre] = 1;
    }
  }
  const genresArray = _formatObjectAsArray(genreCount);
  return _sortByCountAndSlice(genresArray);
}

function getMostPopularBooks(books) {
  const borrowCount = {};
  for (let book of books) {
    borrowCount[book.title] = book.borrows.length;
  }
  const borrowsArray = _formatObjectAsArray(borrowCount);
  return _sortByCountAndSlice(borrowsArray);
}

function getMostPopularAuthors(books, authors) {
  const authorsObj = {};
  for (let book of books) {
    const foundAuthor = authors.find((author) => author.id === book.authorId);
    const authorName = `${foundAuthor.name.first} ${foundAuthor.name.last}`;
    const borrowCount = book.borrows.length;
    if (authorsObj[authorName]) {
      authorsObj[authorName] += borrowCount;
    } else {
      authorsObj[authorName] = borrowCount;
    }
  }
  const authorsArray = _formatObjectAsArray(authorsObj);
  return _sortByCountAndSlice(authorsArray);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
