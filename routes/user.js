// CONSTANTES //
const express = require('express');
const route = express.Router();
const adminControler = require('../controlers/admin');
const userModel = require('../model/user');
const userControler = require('../controlers/user');

// USER //
  // ROUTES GET //
  route.get('/utilisateur', userModel.userform);
  route.get('/delete_user', userModel.userdelete);
  route.get('/edit_user', userModel.useredit);
  route.get('/userhome', userControler.userHomepage);
  route.get('/adminhome', userControler.adminHomepage);

  // ROUTES POST //
  route.post('/edit', adminControler.edit);

// EXPORTS //
module.exports = route;