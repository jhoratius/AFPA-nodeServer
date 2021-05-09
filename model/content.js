const connection = require('../config/dbConnect')
const jwt = require('jsonwebtoken');

class contentmodel {
    
    static modelpost(req, res){
        var jwtToken = req.cookies.jwt;
        var jwtVerify = jwt.verify(jwtToken, process.env.JWT_SECRET)
        

        if(jwtVerify != null){
            var jwtDecode = jwt.decode(jwtToken);
            const contenu = req.body.contenu;
            if(contenu !== '') {
                let data = {
                    image : req.file.originalname,
                    intitule : req.body.intitule,
                    description : req.body.description,
                    publication_idUtilisateur : jwtDecode.id
                }
            
                if(data.image && data.intitule && data.description) {
                    connection.query("INSERT INTO publication SET ? ", data, (error, results) => {
                        return res.render('pages/admin/post', { message: "Votre publication a bien été postée !", userhome : {}})
                    })
                } else {
                        return res.render('pages/admin/post', { message_err : "Tous les champs n'ont pas été remplis."})
                }
            }
            else {
                    return res.render('pages/admin/com', { message_err : "Votre commentaire est vide."})
            }
        } else {
            res.send('Page indisponible')
        }
    }

    static modelcom(req, res){
        var jwtToken = req.cookies.jwt;
        var jwtVerify = jwt.verify(jwtToken, process.env.JWT_SECRET)
        var jwtDecode = jwt.decode(jwtToken);

        if(jwtVerify != null){
            const contenu = req.body.contenu;
            connection.query("INSERT INTO commentaire SET ? ", {contenu: contenu}, (error, results) => {
                return res.render('pages/admin/com', { message: "Votre commentaire a bien été posté !" })
            });
        } else {
            res.send('Page indisponible');
        }
    }
}

module.exports = contentmodel;