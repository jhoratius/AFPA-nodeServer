// CONSTANTES //

const adminmodel = require('../model/admin');

// VIEWS //

exports.adminHomepage = (req, res) => {
    adminmodel.adminHomepage(req, res);
};

// TABLES //

exports.utilisateur = (req, res) => {
    adminmodel.tableUtilisateur(req, res);
};

exports.publication = (req, res) => {
    adminmodel.tablePublication(req, res);
};

exports.commentaire = (req, res) => {
    adminmodel.tableCommentaire(req, res);
};

// UPDATING //

exports.user_delete = (req, res) =>{
    adminmodel.userdelete(req, res);
};

exports.user_edit = (req, res) =>{
    adminmodel.useredit(req, res);
};

exports.edit = async (req, res) => {
    adminmodel.edit(req, res);
};
