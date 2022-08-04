const express = require('express');
const book = require('../models/book');
const createNewBook = require('./books.js');
const router = express.Router();
const Book = require('../models').Book;


//Using async handler to reduce error handling code
function asyncHandler(cb){
    return async(req, res, next) => {
      try {
        await cb(req, res, next)
      } catch(error){
        // Forward error to the global error handler
        next(error);
      }
    }
  }

/* GET home page & redirecting to Book page. */
router.get('/', (req, res) => {
    res.redirect("/books");
// New entry | Posts a new book to database
createNewBook(
  "Dune", "Frank Herbert", "Fiction", "2007"
);
 
    console.log('Handling request to home page, "/"');
  });
  



//Shows full list of books 
router.get('/books', asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    //throw new Error("It Broke")
    res.json(books);
  }));

  //Shows the create new book form - browser says "NewBook at /books/new is not defined"
  router.get('/books/new', asyncHandler(async (req, res) => {
    const newBooks = createNewBook(
      "Test", "Test Author", "Fiction", "2008"
    );
    //res.json(newBooks);
    res.redirect("/books");
  }));

 
  //Shows book detail form
  // router.get('/new', (req, res) => {
  //   res.render("books/new", { book: {}, title: "New Book" });
  // }


  //Updates book info in database | Step one: Find book 
router.get("/:id/edit", asyncHandler(async(req, res) => {
  //const book = await Book.findByPK(req.params.id);
  console.log(req.params.id);

  res.render("update-book.pug", { book, title: "Edit Book" })
}));


//Update Book | Step two: Post method route will request articles ID to update entry
router.post('/:id/edit', asyncHandler(async (req, res) => {
  await book.update(req.body);
  res.redirect("/books/" + book.id);
}));

  //Deletes a book - create a "test" book to test deleting, since it can't be undone.
router.get("/:id/delete", asyncHandler(async (req, res) => {
  res.render("books/delete", { book: {}, title: "Delete Book" });
}));

  //When new book or book detail form is submitted, app should redirect to books listing page

module.exports = router;
