// CONST //

const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// const route = require('./routes/pages');
// const flash = require(express-flash)
// const session = require(express-session)

// PASSPORT //
// const passport = require('passport')
// const initializePassport = require('./passport-config');
// initializePassport(
//     passport,
//     email =>
//         users.find(user => user.email === email)
// )

// DIRECTORY //

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(express.json());
app.use(cookieParser());
// app.use(flash())

// PATH //

dotenv.config({path:'./.env'});
const pubDirect = path.join(__dirname, './public')

// ROUTES //

app.use('/', require('./routes/admin'));
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/general'));
app.use('/', require('./routes/user'));

// SET //

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// PORT //

app.listen(8000);