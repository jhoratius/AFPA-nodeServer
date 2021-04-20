const contentmodel = require('../model/content');

// PUBLICATION //
exports.getpost = (req, res) => {
    res.render('pages/admin/post')
};
exports.post = (req, res) => {
    contentmodel.modelpost(req, res);
};

// COMMENTAIRE //
exports.getcom = (req, res) => {
    res.render('pages/admin/com')
};
exports.com = (req, res) => {
    contentmodel.modelcom(req, res);
};