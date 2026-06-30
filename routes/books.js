const express = require('express'); // Import express.js core module
const router = express.Router(); // Create an instance of the express router
const book = require('../models/book'); // Import the Book model from the models/book.js file

// Remember because it's ALREADY going to /books, we don't need to add that here. So this is just /, which is the same as /books.

// Getting All
router.get('/', async (req, res) => {  // async function to handle GET requests to the root of the /books route, which retrieves all book documents from the database.
    console.log("Getting all books!");
    try {
        const books = await book.find(); // Gets all books from the book model using the find() method, which returns a promise that resolves to an array of book documents.
        res.status(200).json(books); // returns the book
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One
router.get('/:id', async (req, res) => {
    console.log("Getting one book!");
    try {
        const book = await book.findById(req.params.id);
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Creating One
router.post('/', async (req, res) => {
    console.log("Creating one book!");
    const newBook = new book({ 
        title: req.body.title,
        author: req.body.author,
        publicationDate: req.body.publicationDate,
        isbn: req.body.isbn
    });
    try {
        const savedBook = await newBook.save(); // Waiting for the book to be saved to the database, which returns a promise that resolves to the saved book document.
        console.log("New book created:", savedBook);
        res.status(201).json(savedBook); // Sending back to the user with 201 because made successfully
    } catch (err) {
        console.error("Error creating book:", err);
        res.status(400).json({ message: err.message }); // Send back to the user with 400 because bad user request.
    }
});

// Updating One
router.patch('/:id', (req, res) => {
    res.send("Updating one book with id: " + req.params.id);
});

// Deleting One
router.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await book.findByIdAndDelete(req.params.id);
        res.status(410).json({ message: "Book deleted successfully", book: deletedBook });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router; // Export the router instance so it can be used in server.js