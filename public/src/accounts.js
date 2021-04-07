function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((itemA, itemB) =>
    itemA.name.last > itemB.name.last ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((acc, book) => {
    const totalBorrows = book.borrows.reduce((borrowAcc, borrow) => {
      return borrow.id === account.id ? borrowAcc + 1 : borrowAcc;
    }, 0);
    return acc + totalBorrows;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  let possessedBooks = [];
  books.map((book) => {
    const borrowArray = book.borrows;
    borrowArray.map((borrow) => {
      if (borrow.id === accountId && borrow.returned === false)
        possessedBooks.push(book);
    });
  });
  possessedBooks.map((book) => {
    book.author = authors.find((author) => author.id === book.authorId);
  });
  return possessedBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
