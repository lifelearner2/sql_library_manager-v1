const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

// Using asyncHandler to reduce error handling and asynchronous code
function asyncHandler(cb) {
    return async(req, res, next) => {
      try {
        await cb(req, res, next)
      } catch(error){
        // Forward error to the global error handler
        next(error);
      }
    }
  }

// GET homepage & redirect to books page.
router.get('/', (req, res) => {
  res.redirect("/books");
});

// GET & show full list of books.
router.get('/books', asyncHandler(async(req, res) => {
  const books = await Book.findAll();
  res.render('index', { books });
}));

// GET New Book page & show form to create a new book.
router.get('/books/new', (req, res) => {
  res.render('new-book')
});

// POST New Book creates a new book. Then redirects to the all books page.
router.post('/books/new', asyncHandler(async(req, res) => {
  const { title, author, genre, year } = req.body;
  try {
    await Book.create({ title, author, genre, year })
    res.redirect('/books')
  } catch(err) {
     // If title and/or author form fields are empty, form will not submit and page shows friendly error message.
    if (err.name === 'SequelizeValidationError') {
      res.render('new-book', {
        errors: err.errors,
      });
    } else {
      throw err;
    }
  }
}));

// GET Update Book page & show form with current fields populated, to Update Book.
router.get('/books/:id', asyncHandler(async(req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    book ? res.render('update-book', { book }) : next();
  } catch(err) {
    throw err;
  }
}));

// POST Update Book updates the book in database based on the form values edited by the user. Then redirects to the all books page.
router.post('/books/:id', asyncHandler(async(req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    await book.update(req.body); 
    res.redirect('/books');
  } catch(err) {
     // If title and/or author form fields are empty, form will not submit and page shows friendly error message.
    if (err.name === 'SequelizeValidationError') {
      book = await Book.build(req.body);
      book.id = req.params.id;
      res.render('update-book', { 
        book, errors: err.errors,
        title: 'Update Book'
      });
    } else {
      throw err;
    }
  }
}));

// POST Delete Book deletes the book from database. Then redirects to the all books page.
router.post('/books/:id/delete', asyncHandler(async(req, res) => {
  try {
    await Book.destroy({ where: { id: req.params.id } });
    res.redirect('/books');
  } catch(err) {
    throw err;
  }
}));
 
module.exports = router;