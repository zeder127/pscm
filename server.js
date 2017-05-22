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


// Create a new app
const app = express();

const users = require('./routes/users');

// Set port number
const port = 3000;

// Set cors MW
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Set body-parser MW
app.use(bodyParser.json());

// Set passeord MW
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Set router
app.use('/users', users);

// Set port
app.listen(port);

// Index Route
app.get('/', (req, res) => {
    res.send('hello world!!');
})

//View Engine
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

// //Set Static Folder
// app.use(express.static(path.join(__dirname, 'client')));


