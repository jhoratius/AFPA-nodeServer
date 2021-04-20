// CONSTANTES //
const express = require('express');
const route = express.Router();
const adminControler = require('../controlers/admin')

// ROUTES GET //
route.get('/adminhome', adminControler.adminconnected);

route.get('/publication', adminControler.publication);

route.get('/commentaire', adminControler.commentaire);

// EXPORTS //
module.exports = route;