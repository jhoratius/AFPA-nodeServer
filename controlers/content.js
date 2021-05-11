const contentmodel = require('../model/content');

// GETS //
exports.getpost = (req, res) => {
    res.render('pages/admin/post')
};
exports.post = (req, res) => {
    contentmodel.modelpost(req, res);
};
exports.getSolopost = (req, res) => {
    contentmodel.solopost(req, res);
}

// POSTS //

exports.com = (req, res) => {
    contentmodel.modelcom(req, res);
};
exports.solopost = (req, res) => {
    contentmodel.modelsolopost(req, res);
}
