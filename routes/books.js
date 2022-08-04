 const express = require('express');
const res = require('express/lib/response');
 //const router - express.router();
 const Book = require('../models').Book;
 const newBooks = require('../models').newBooks;
 const pug = require ('pug');

 //console.log(pug.renderFile('new-book.pug'));
 console.log(newBooks);
 
 // New entry | Posts a new book to database
 function createBook (title, author, genre, year) {
 const book2 =  Book.create({
    title: title,
    author: author,
    genre: genre,
    year: year
  });  
  //console.log(book2.toJSON());
  return book2;
};

  
  module.exports = createBook;