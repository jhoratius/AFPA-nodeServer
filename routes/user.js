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

  route.get('/userprofile', userModel.userProfile);
  route.get('/disconnection', userModel.userDisconnect)

  // ROUTES POST //
  route.post('/edit_user', adminControler.edit);

// EXPORTS //
module.exports = route;