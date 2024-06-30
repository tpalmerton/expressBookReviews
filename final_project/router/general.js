const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    // Create promise-based callback
  const getBookList = new Promise((resolve, reject) => {
    resolve(res.send(JSON.stringify({ books }, null, 4)));
  });
  getBookList.then(() => console.log("Promise 10 resolved."));
  // res.send(JSON.stringify(books,null,4));
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const getBook = new Promise((resolve, reject) => {
    resolve(res.send(books[isbn]));
  });
  getBook.then(() => console.log("Promise 11 resolved"));
  // res.send(books[isbn])
  // return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let booksByAuthor = [];
  let isbns = Object.keys(books);
  isbns.forEach((isbn) => {
    if (books[isbn]["author"] === req.params.author) {
      booksByAuthor.push({
        isbn: isbn,
        title: books[isbn]["title"],
        reviews: books[isbn]["reviews"],
      });
    }
  });
  const getBooksByAuthor = new Promise((resolve, reject) => {
    resolve(res.send(JSON.stringify({ booksByAuthor }, null, 4)));
  });
  getBooksByAuthor.then(() => console.log("Promise 12 resolved"));
  //const authors = req.params.author;
  //let filtered_author = Object.values(books).filter(books => books.author === authors);
  res.send(filtered_author);
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let booksByTitle = [];
  let isbns = Object.keys(books);
  isbns.forEach((isbn) => {
    if (books[isbn]["title"] === req.params.title) {
      booksByTitle.push({
        isbn: isbn,
        author: books[isbn]["author"],
        reviews: books[isbn]["reviews"],
      });
    }
  });
  const getBookByTitle = new Promise((resolve, reject) => {
    resolve(res.send(JSON.stringify({ booksByTitle }, null, 4)));
  });
  getBookByTitle.then(() => console.log("Promise 13 resolved"));
  //const titles = req.params.title;
  //let filtered_title = Object.values(books).filter(books => books.title === titles);
  //res.send(filtered_title);
  // return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  let review = isbn.reviews;
  // let message = "No reviews found";
  //if (review) {
  return res.send(JSON.stringify({ review }, null, 4));
  //} else {
  //  return res.send(message)
  //}
  // return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;