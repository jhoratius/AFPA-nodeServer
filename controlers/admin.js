const usermodel = require('../model/user');

// EDIT //
exports.edit = async (req, res) => {
    usermodel.edit(req, res);
}

// ADMIN //
exports.adminconnected = (req, res) => {
    res.render('pages/admin/adminhome')
};

exports.adminHomepage = (req, res) => {
    usermodel.adminHomepage(req, res);
};

