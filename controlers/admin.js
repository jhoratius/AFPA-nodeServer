const usermodel = require('../model/user');
const adminmodel = require('../model/admin');

// EDIT //
exports.edit = async (req, res) => {
    usermodel.edit(req, res);
}

// ADMIN //
exports.adminconnected = (req, res) => {
    res.render('pages/admin/adminhome')
};

// TABLEAUX //
exports.adminHomepage = (req, res) => {
    adminmodel.adminHomepage(req, res);
};

exports.publication = (req, res) => {
    adminmodel.tablePublication(req, res);
}

exports.commentaire = (req, res) => {
    adminmodel.tableCommentaire(req,res);
}

