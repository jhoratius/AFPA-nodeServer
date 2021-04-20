// CONSTANTES //
const authmodel = require('../model/auth');

// INSCRIPTION //
exports.getregister = (req, res) => {
    res.render('pages/userfile/user')
};
exports.register = (req, res) => {
    authmodel.registermodel(req, res);
};

// CONNEXION //
exports.getlogin = (req, res) => {
    res.render('pages/userfile/login')
};
exports.login = async (req, res) => {
    authmodel.loginmodel(req, res);
}