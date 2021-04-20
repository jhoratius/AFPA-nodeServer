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
    console.log('body', req.body);
    const contenu = req.body.contenu;
    if(contenu !== '') {
        contentmodel.modelcom(req, res);
    } else {
            return res.render('pages/admin/com', { message_err : "Votre commentaire est vide."})
        }
};