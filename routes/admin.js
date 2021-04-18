// CONSTANTES //
const express = require('express');
const route = express.Router();
const adminControler = require('../controlers/admin')

// ROUTES GET //
route.get('/adminhome', adminControler.adminconnected);

// EXPORTS //
module.exports = route;