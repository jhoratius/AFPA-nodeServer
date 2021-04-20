const connection = require('../config/dbConnect')

class contentmodel {
    
    static modelpost(req, res){
        console.log('body', req.body);
        const contenu = req.body.contenu;
        if(contenu !== '') {
            let data = {
                image : req.file.originalname,
                intitule : req.body.intitule,
                description : req.body.description
            }

            if(data.image && data.intitule && data.description) {
                connection.query("INSERT INTO publication SET ? ", data, (error, results) => {
                    return res.render('pages/admin/post', { message: "Votre publication a bien été postée !", userhome : {} })
                })
            } else {
                    return res.render('pages/admin/post', { message_err : "Tous les champs n'ont pas été remplis."})
            }
        }
        else {
                return res.render('pages/admin/com', { message_err : "Votre commentaire est vide."})
        }
    }

    static modelcom(req, res){
        const contenu = req.body.contenu;
        connection.query("INSERT INTO commentaire SET ? ", {contenu: contenu}, (error, results) => {
            return res.render('pages/admin/com', { message: "Votre commentaire a bien été posté !" })
        })
    }
    
}

module.exports = contentmodel;