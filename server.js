const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const dbConfig = require('./config/db_mongo');


// Connect to Db
mongoose.connect(dbConfig.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + dbConfig.database);
})

// On Connection
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
})

// const index = require('./routers/index');
// const products = require('./routers/products');


// Create a new server
const server = express();

const users = require('./routes/users');

// Set port number
const port = 3000;

// Set cors MW
server.use(cors());

//Set Static Folder
server.use(express.static(path.join(__dirname, 'public')));

// Set body-parser MW
server.use(bodyParser.json());

// Set passeord MW
server.use(passport.initialize());
server.use(passport.session());

require('./config/passport')(passport);

// Set router
server.use('/users', users);

// Set port
server.listen(port);

// Index Route
server.get('/', (req, res) => {
    res.send('hello world!!');
})

//View Engine
// server.set('views', path.join(__dirname, 'views'));
// server.set('view engine', 'ejs');
// server.engine('html', require('ejs').renderFile);

// //Set Static Folder
// server.use(express.static(path.join(__dirname, 'client')));


