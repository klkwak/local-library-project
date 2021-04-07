function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const loanedBooks = books.filter(
    (book) => book.borrows[0].returned === false
  );
  const returnedBooks = books.filter(
    (book) => book.borrows[0].returned === true
  );
  return [loanedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  const bookBorrows = book.borrows;
  const borrowsObj = {};
  bookBorrows.map((borrow) => {
    const foundAccount = accounts.find((account) => account.id === borrow.id);
    borrowsObj[borrow.id] = { ...foundAccount, ...borrow };
  });
  return Object.values(borrowsObj);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
