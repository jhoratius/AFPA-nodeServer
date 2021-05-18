// CONSTANTES //
const usermodel = require("../model/user");

// USER HOMEPAGE //
exports.userHomepage = (req, res) => {
    usermodel.userHomepage(req, res);
};

// USER PROFILE //

exports.userProfile = (req, res) => {
    usermodel.userprofile(req, res);
}

exports.updateProfile = (req, res) => {
    usermodel.updateprofile(req, res);
}

// USER DELETE/DISCONNECT //

exports.userDisconnect = (req, res) => {
    usermodel.userdisconnect(req, res);
}

exports.deleteAccount = (req, res) => {
    usermodel.deleteaccount(req, res);
}