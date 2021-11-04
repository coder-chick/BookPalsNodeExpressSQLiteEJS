let express = require("express");
let router = express.Router();

const myDB = require("../db/MySqliteDB.js");

/* GET home page. */
router.get("/", async function (req, res) {
  console.log("Got request for /");

  const book = await myDB.getBook();

  console.log("got Book", book);

  // render the _index_ template with the book attrib as the list of book
  res.render("index", { book: book});
});

/* GET book details. */
router.get("/book/:isbn", async function (req, res) {
  console.log("Got book details");

  const isbn = req.params.isbn;

  console.log("got book details ", isbn);

  const book = await myDB.getBookByID(isbn);

  console.log("Book created");

  res.render("bookDetails", {book: book});
});

/* POST create book. */
router.post("/book/create", async function (req, res) {
  console.log("Got post create/book");

  const book = req.body;

  console.log("got create book", book);

  await myDB.createBook(book);

  console.log("Book created");

  res.redirect("/");
});

/* POST create book. */
router.post("/book/delete", async function (req, res) {
  console.log("Got post delete Book");

  const book = req.body;

  console.log("got delete book", book);

  await myDB.deleteBook(book);

  console.log("Book deleted");

  res.redirect("/");
});


module.exports = router;
