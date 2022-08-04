 const express = require('express');
const res = require('express/lib/response');
 //const router - express.router();
 const Book = require('../models').Book;
 const newBooks = require('../models').newBooks;
 const pug = require ('pug');

 console.log(pug.renderFile('new-book.pug'));
 console.log(newBooks);
 
 // New entry | Posts a new book to database
 const book2 = await Book.create({
    title: 'Becoming'
  });  
  console.log(book2.toJSON());


  
  module.exports = router;