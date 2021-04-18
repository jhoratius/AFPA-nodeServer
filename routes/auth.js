// CONSTANTES //
const express = require('express');
const route = express.Router();
const authControler = require('../controlers/auth');

// ROUTES GET //
route.get("/register", authControler.getregister);
route.get("/login", authControler.getlogin);

// ROUTES POST //
route.post('/register', authControler.register);
route.post('/login', authControler.login);

// EXPORTS //
module.exports = route;