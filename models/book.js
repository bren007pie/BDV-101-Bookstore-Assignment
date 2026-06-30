const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({ // Defining the schema for the Book model, which represents the structure of a book document in the MongoDB database.
    title: {
        type: String,
        required: true  // need the required field to be true, so that the title is required when creating a new book document
    },
    author: {
        type: String,
        required: true
    },
    publicationDate: {
        type: Date,
        required: true
    },
    isbn: {
        type: Number,
        required: true
    }
});

const Book = mongoose.model('Book', bookSchema); // Making a model from the schema, which allows us to interact with the 'books' collection in the MongoDB database using the defined schema.

module.exports = Book;
