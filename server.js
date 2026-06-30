// following this video https://www.youtube.com/watch?v=fgTGADljAeg

// Imports
const express = require('express'); // Import express.js core module
const mongoose = require('mongoose'); // Import mongoose.js core module
require('dotenv').config(); // Import dotenv.js core module, which loads environment variables from a .env file into process.env
const bookRouter = require('./routes/books'); // Import the bookRouter script from the routes/books.js file
const userRouter = require('./routes/users'); // Import the userRouter script from the routes/users.js file
const authorRouter = require('./routes/authors'); // Import the authorRouter script from the routes/authors.js file

(() => {console.log("YALLO")})(); // defining an anonmys funtion and calling it

// Server/database set up
const server = express(); // enviornment variable for server
mongoose.connect(process.env.DATABASE_URL); // connecting to MongoDB database using the environment variable, based on https://mongoosejs.com/docs/connections.html
const db = mongoose.connection;
db.on("error", (error) => console.error(error)); // Contionously on error event, and attaching a listener which logs the error to the console.
db.once("open", () => console.log("Connected to database!!!")); // One time on open event, and attaching a listener which logs says we're connected.


// Server set up and routing
server.use(express.json()); //allows us to run middleware, so the server can accept JSON in before it's passed on.


    // Actual Endpoints

server.use('/books', bookRouter); // when the server receives a request to /books, it will use the code in routes/books.js 
server.use('/users', userRouter); // when the server receives a request to /users, it will use the code in routes/users.js
server.use('/authors', authorRouter); // when the server receives a request to /authors, it will use the code in routes/authors.js

    // Basic Routing
server.get('/', (req, res) => { // when the server receives a request to /
    res.status(200).send("Welcome to the Bookstore! Please use the following endpoints: /books, /users, /authors");
});

server.post('/', (req, res) => { // when the server receives a POST request to /
    res.status(200).send("POST request to the homepage. Please use the following endpoints: /books, /users, or /authors.");
});

server.patch('/', (req, res) => { // when the server receives a PATCH request to /
    res.status(200).send("PATCH request to the homepage. Please use the following endpoints: /books, /users, or /authors.");
});

server.delete('/', (req, res) => { // when the server receives a DELETE request to /
    res.status(200).send("DELETE request to the homepage. Please use the following endpoints: /books, /users, or /authors.");
});

server.listen(5000, () => {console.log('Node.js web server at port 5000 is running..')}); // listen for any incoming requests, has a callback function when the server is done running


