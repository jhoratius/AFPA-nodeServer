// CONSTANTES //
const express = require('express');
const route = express.Router();

const userControler = require('../controlers/user');

// ROUTES //
  // USER HOMEPAGE //
  route.get('/userhome', userControler.userHomepage);

  // USER PROFILE //
  route.get('/userprofile', userControler.userProfile);
  route.get('/updateProfile', userControler.updateProfile);

  // USER DELETE/DISCONNECT //
  route.get('/disconnection', userControler.userDisconnect);
  route.get('/delete_account', userControler.deleteAccount);

// EXPORTS //
module.exports = route;