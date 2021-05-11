// CONSTANTES //
const express = require('express');
const route = express.Router();
const contentControler = require('../controlers/content')
const multer = require('multer');

// MULTER //
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/img/');   
    }, 
    filename: function (req, file, callback) {
        callback(null, file.originalname);   
    }   
})   
var upload = multer({ storage: storage });

// ROUTES GET //
route.get("/", (req, res) => {
    res.render('pages/accueil')
});
route.get('/post', contentControler.getpost);
route.get('/solopost', contentControler.getSolopost);

// ROUTES POST //
route.post('/post', upload.single('image'), contentControler.post);

route.post('/solopost', contentControler.solopost);

// EXPORTS //
module.exports = route;