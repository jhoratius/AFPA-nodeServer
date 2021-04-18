const connection = require('../config/dbConnect');
const contentmodel = require('../model/content');

// PUBLICATION //
exports.getpost = (req, res) => {
    res.render('pages/admin/post')
};
exports.post = (req, res) => {
    console.log('body', req.body);
    const {image, intitule, description} = req.body;
    if(image && intitule && description) {
            contentmodel.modelpost(req, res);
    } else {
            return res.render('pages/admin/post', { message_err : "Tous les champs n'ont pas été remplis."})
        }
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