// I encountered "database is locked" error when performing book creation and deletion. I observed that the problem appears after successfully performing the initial creation operation. I suspect it's because db is not closed in the methods below. Maybe try closing the db using db.close() in each method below? 
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

sqlite3.verbose();

async function connect() {
  return open({
    filename: "./db/books.db",
    driver: sqlite3.Database,
  });
}

async function getBook() {
  const db = await connect();

  return await db.all("SELECT * FROM Book ORDER BY isbn DESC LIMIT 20");
}

async function createBook(newBook) {
  const db = await connect();

  const stmt = await db.prepare(`INSERT INTO
    Book(book_title, year_of_publication, author_id, user_id, region_id)
    VALUES (:book_title, :year_of_publication, :author_id, :user_id, :region_id)
  `);

  stmt.bind({
    ":book_title": newBook.book_title,
    ":year_of_publication": newBook.year_of_publication,
    ":author_id": newBook.author_id,
    ":user_id": newBook.user_id,
    ":region_id": newBook.region_id,
  });

  return await stmt.run();
}

async function getBookByID(isbn) {
  const db = await connect();

  const stmt = await db.prepare(`SELECT *
    FROM Book
    WHERE
      isbn = :isbn
  `);

  stmt.bind({
    ":isbn": isbn,
  });

  return await stmt.get();
}

async function deleteBook(bookToDelete) {
  const db = await connect();

  const stmt = await db.prepare(`DELETE FROM
    Book
    WHERE isbn = :theIDToDelete
  `);

  stmt.bind({
    ":theIDToDelete": bookToDelete.isbn,
  });

  return await stmt.run();
}
module.exports.getBook = getBook;
module.exports.createBook = createBook;
module.exports.deleteBook = deleteBook;
module.exports.getBookByID = getBookByID;
