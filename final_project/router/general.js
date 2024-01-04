const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!doesExist(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {

    const bookListPromise = new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(JSON.stringify(books,null,4))
        },1000)
    });

    bookListPromise.then((result)=>{    
        res.send(result);
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {

    const bookListPromise = new Promise((resolve, reject) => {
        setTimeout(()=>{
            const isbn = req.params.isbn;
            resolve(books[isbn])
        },1000)
    });

    bookListPromise.then((result)=>{    
        res.send(result);
    });
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
   let result = [];

   const bookListPromise = new Promise((resolve, reject) => {
    setTimeout(()=>{
        for(const book in books) {
            if(books[book].author === author) {
                result.push(books[book]);
            }
           }
        resolve(result)
    },1000)
});

bookListPromise.then((success)=>{    
    res.send(success);
});

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    let result = [];

    const bookListPromise = new Promise((resolve, reject) => {
        setTimeout(()=>{
            for(const book in books) {
                if(books[book].title === title) {
                    result.push(books[book]);
                }
               }
            resolve(result)
        },1000)
    });
    
    bookListPromise.then((success)=>{    
        res.send(success);
    });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews)
});

module.exports.general = public_users;
