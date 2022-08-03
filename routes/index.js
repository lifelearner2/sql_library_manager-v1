const express = require('express');
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
    console.log('Handling request to home page, "/"');
  });
  
//Shows full list of books | Using Async/Await (should it be res.render?)
router.get('/books', asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    //throw new Error("It Broke")
    res.json(books);
  }));

  //Shows the create new book form 
  router.get('/books/new', asyncHandler(async (req, res) => {
    const newBooks = await NewBook.get();
    res.json(newBooks);
  }));

  //Posts a new book to database


  //Shows book detail form

  //Updates book info in database

  //Deletes a book - create a "test" book to test deleting, since it can't be undone.

  //When new book or book detail form is submitted, app should redirect to books listing page

module.exports = router;
