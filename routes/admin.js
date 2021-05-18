// CONSTANTES //
const express = require('express');
const route = express.Router();

const adminControler = require('../controlers/admin')

// ROUTES //

    // VIEWS //

        // HOMEPAGE //
        route.get('/adminhome', adminControler.adminHomepage);

        // TABLES //
        route.get('/publication', adminControler.publication);
        route.get('/commentaire', adminControler.commentaire);
        route.get('/utilisateur', adminControler.utilisateur);

    // UPDATING //

        // GET //
        route.get('/delete_user', adminControler.user_delete);
        route.get('/edit_user', adminControler.user_edit);

        // POST //
        route.post('/edit_user', adminControler.edit);

// EXPORTS //
module.exports = route;