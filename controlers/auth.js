// CONSTANTES //
const authmodel = require('../model/auth');

// INSCRIPTION //
exports.getregister = (req, res) => {
    res.render('pages/userfile/user')
};
exports.register = (req, res) => {
    const {prenom, nom, email, password1, password2, pseudo, role} = req.body;
    if(req.body.prenom && req.body.nom && req.body.email && req.body.password1 && req.body.password2 && req.body.pseudo){
        authmodel.registermodel(req, res);
    } else {
        return res.render('pages/userfile/user', {
            message_err : "Un des champs requis n'a pas été rempli"
        })
    }
};

// CONNEXION //
exports.getlogin = (req, res) => {
    res.render('pages/userfile/login')
};
exports.login = async (req, res) => {
    authmodel.loginmodel(req, res);
}