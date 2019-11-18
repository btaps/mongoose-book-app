//--------------------------------SETUP
//require express in our app
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');


// generate a new express app and call it 'app'
const app = express();

//---------------------------------MIDDLEWARE

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

//-------------------------------CONFIGURATION VARIABLES
const PORT = process.env.PORT || 3000;

let newBookUUID = 18;

// ----------------------------ROUTES

// define a root route: localhost:3000/
app.get('/',  (req, res) => {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all books
app.get('/api/books',  (req, res) => {
 // send all books as JSON response 
  db.Book.find({}, (err, books)=>{
    if(err) {
      console.log('index error: ' + err);
      res.sendStatus(500);
    }
    res.json(books);  
  });
});

// get one book
app.get('/api/books/:id',  (req, res) => {
  let bookId = req.params.id;
  let books = db.Book
  console.log(books._id)
  db.Book.findOne({_id : bookId}, (err, foundBook)=>{
    if(err) {return console.log(err)}
    res.json(foundBook);
    console.log('books show', req.params);
  });  
});

// create new book
app.post('/api/books',  (req, res) => {
  // create new book with form data (`req.body`)
  console.log('book created', req.body);
  const newBook = req.body;
  
  db.Book.create(newBook, (err, newBook)=>{
    if(err){ return console.log(err) }
    newBook._id = newBookUUID++;
    books.push(newBook);
    res.json(newBook);
  });
});

// update book
app.put('/api/books/:id', (req,res) => {
// get book id from url params (`req.params`)
  console.log('books update', req.params);
  const bookId = req.params.id;
   
  // find the index of the book we want to remove
  db.Book.findOneAndUpdate(
    { _id: bookId}, // search condition
    req.body,
    { new: true },
    (err, updatedBook)=>{ // callback
    if(err) { return console.log(err) }
    res.json(updatedBook);
  });
  
  console.log('updating book:', req.body.title);
});

// delete book
app.delete('/api/books/:id',  (req, res) => {
  // get book id from url params (`req.params`)
  console.log('books delete', req.params);
  const bookId = req.params.id;
  
  db.Book.deleteOne(
    { _id: bookId },
    (err, deletedBook)=>{
      if(err) { return console.log(err) };
      res.json(deletedBook);
      
   });
  
});

// Start Server
app.listen(PORT, () => console.log(`Book app listening at http://localhost:${PORT}/`));
