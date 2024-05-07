const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop 
// TEST http://localhost:5000 
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books))
  return res.status(300).json({message: "Yet to be implemented amos"});
});

// Get book details based on ISBN
// Search for the book with the specified ISBN
// Note Test with /isbn<ISBN> eg GET http://localhost:5000/isbn74832746
public_users.get('/isbn:isbn',function (req, res) {
  const requestedISBN = req.params.isbn;
  
  const book = Object.values(books).find((b) => b.ISBN === requestedISBN);

  if (book) {
    // Book found
    return res.status(200).json(book);
  } else {
    // Book not found
    return res.status(404).json({ message: "Book not found" });
  }

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
