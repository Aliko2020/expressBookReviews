const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //getting user data from request body
  const { username, email, password } = req.body;

  // Check if required fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username, email, and password are required" });
  }
  
  // Check if the username is already taken
  if (users.some(user => user.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Save the user data to the database
  const newUser = { username, email, password: password };
  users.push(newUser);

  return res.status(200).json({ message: "User registered successfully" });
});

// Get the book list available in the shop 
// TEST http://localhost:5000 
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books))
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
// Test on http://localhost:5000/author/Jane Austen
public_users.get('/author/:author',function (req, res) {
  const requestedAuthor = req.params.author;
  const author = Object.values(books).find((a) => a.author === requestedAuthor);
  if (author) {
    // author found
    return res.status(200).json(author);
  } else {
    // author not found
    return res.status(404).json({ message: "author not found" });
  }

});

// Get all books based on title
// TEST eg http://localhost:5000/title/The Epic Of Gilgamesh
public_users.get('/title/:title',function (req, res) {
  const requested_based_title = req.params.title;
  
  const title = Object.values(books).find((t) => t.title === requested_based_title);
  if (title) {
    // book found
    return res.status(200).json(title);
  } else {
    // book not found
    return res.status(404).json({ message: "book not found" });
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
