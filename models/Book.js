const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = new Schema({
  title: String,
  author: String,
  image: String,
  releaseDate: String
});

const Book = mongoose.model('Book', BookSchema);

mode.exports = Book;
