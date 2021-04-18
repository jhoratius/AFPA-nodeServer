const connection = require('../config/dbConnect')

class contentmodel {
    static modelcom(req, res){
        connection.query("INSERT INTO commentaire SET ? ", {contenu: contenu}, (error, results) => {
            return res.render('pages/admin/com', { message: "Votre commentaire a bien été posté !" })
        })
    }

    static modelpost(req, res){
        connection.query("INSERT INTO publication SET ? ", {image : image, intitule : intitule, description : description}, (error, results) => {
            return res.render('pages/admin/post', { message: "Votre publication a bien été postée !" })
        })
    }
}

module.exports = contentmodel;