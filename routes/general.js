// CONSTANTES //
const express = require('express');
const route = express.Router();
const contentControler = require('../controlers/content')

// ROUTES GET //
route.get("/", (req, res) => {
    res.render('pages/accueil')
});

route.get('/post', contentControler.getpost);
route.get('/com', contentControler.getcom);

// ROUTES POST //
route.post('/post', contentControler.post);
route.post('/com', contentControler.com);

// EXPORTS //
module.exports = route;