const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/book-app";
const exports = require('./Book');

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));