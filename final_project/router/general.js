const express = require("express");
let books = require("./booksdb.js");
const axios = require("axios");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

//Registering a new user
public_users.post("/register", (req, res) => {
  //getting user data from request body
  const { username, email, password } = req.body;

  // Check if required fields are provided
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Username, email, and password are required" });
  }
  // Check if the username is already taken
  if (users.some((user) => user.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Save the user data to the database
  const newUser = { username, email, password: password };
  users.push(newUser);

  return res.status(200).json({ message: "User registered successfully" });
});

// Get the book list available in the shop
// TEST http://localhost:5000
// public_users.get('/',function (req, res) {
//   res.send(JSON.stringify(books))
// });
public_users.get("/", (req, res) => {
  const fetchBookList = () => {
    return new Promise((resolve, reject) => {
      try {
        const bookList = JSON.stringify(books);
        resolve(bookList);
      } catch (error) {
        reject(error);
      }
    });
  };

  fetchBookList()
    .then((bookList) => res.send(bookList))
    .catch((error) => {
      console.error("Error fetching book list:", error);
      return res.status(500).json({ message: "Error fetching book list" });
    });
});

// Get book details based on ISBN
// Search for the book with the specified ISBN
// Note Test with /isbn<ISBN> eg GET http://localhost:5000/isbn74832746
public_users.get("/isbn/:isbn", (req, res) => {
  const requestedISBN = req.params.isbn;

  const findBookByISBN = () => {
    return new Promise((resolve, reject) => {
      const book = Object.values(books).find((b) => b.ISBN === requestedISBN);
      if (book) {
        resolve(book);
      } else {
        reject(new Error("Book not found"));
      }
    });
  };

  findBookByISBN()
    .then((book) => res.status(200).json(book))
    .catch((error) => {
      console.error("Error fetching book details:", error.message);
      return res.status(404).json({ message: "Book not found" });
    });
});

// Get book details based on author
// Test on http://localhost:5000/author/Jane Austen
public_users.get("/author/:author", (req, res) => {
  const requestedAuthor = req.params.author;

  const findAuthorBook = () => {
    return new Promise((resolve, reject) => {
      const author = Object.values(books).find(
        (a) => a.author === requestedAuthor
      );
      if (author) {
        resolve(author);
      } else {
        reject(new Error("Author not found"));
      }
    });
  };

  findAuthorBook()
    .then((author) => res.status(200).json(author))
    .catch((error) => {
      console.error("Error fetching author details:", error.message);
      return res.status(404).json({ message: "Author not found" });
    });
});

// Get all books based on title
// TEST eg http://localhost:5000/title/The Epic Of Gilgamesh
public_users.get("/title/:title", (req, res) => {
  const requestedTitle = req.params.title;

  const findBookByTitle = () => {
    return new Promise((resolve, reject) => {
      const title = Object.values(books).find(
        (t) => t.title === requestedTitle
      );
      if (title) {
        resolve(title);
      } else {
        reject(new Error("Book not found"));
      }
    });
  };

  findBookByTitle()
    .then((book) => res.status(200).json(book))
    .catch((error) => {
      console.error("Error fetching book details:", error.message);
      return res.status(404).json({ message: "Book not found" });
    });
});

//  Get book based on review
public_users.get("/review/:isbn", function (req, res) {
  //
  const requested_review = req.params.isbn;

  const filtered_review = Object.values(books).find(
    (r) => r.reviews === requested_review
  );

  res.send(filtered_review);
});

module.exports.general = public_users;
