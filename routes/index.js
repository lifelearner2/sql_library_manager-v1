const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

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

/* GET home page. */
router.get('/', (req, res) => {
    res.redirect("/books");
  });
  
router.get('/books', asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    res.json(books);
  }));

module.exports = router;
