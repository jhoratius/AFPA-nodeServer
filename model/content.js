const connection = require('../config/dbConnect')
const jwt = require('jsonwebtoken');

class contentmodel {
    static post(req, res) {
        res.render('pages/admin/post');
    }

    static modelpost(req, res) {
        var jwtToken = req.cookies.jwt;
        if (jwtToken != null) {
            var jwtVerify = jwt.verify(jwtToken, process.env.JWT_SECRET)
            if (jwtVerify != null) {
                var jwtDecode = jwt.decode(jwtToken);
                console.log('request : ', req.file)
                let data = {
                    image: req.file.originalname,
                    intitule: req.body.intitule,
                    description: req.body.description,
                    publication_idUtilisateur: jwtDecode.id
                }
                if (data.image && data.intitule && data.description) {
                    connection.query("INSERT INTO publication SET ? ", data, (error, results) => {
                        return res.render('pages/admin/post', { message: "Votre publication a bien été postée !", userhome: {} })
                    })
                } else {
                    return res.render('pages/admin/post', { message_err: "Tous les champs n'ont pas été remplis." })
                }
            } else {
                return res.send('Page indisponible');
            }
        } else {
            return res.send('Page Indisponible')
        }

    }

    static modelsolopost(req, res) {
        var token = req.cookies.jwt;
        console.log("console body :", req.body);
        if (token === null) {
            return res.send('Page indisponible')
        } else {
            var jwtVerify = jwt.verify(token, process.env.JWT_SECRET);
            if (jwtVerify === null) {
                return res.send('Page indisponible')
            } else {
                var jwtDecode = jwt.decode(token);
                let data2 = {
                    date_heure : new Date(),
                    Publication_idPublication: req.body.idPub,
                    contenu: req.body.contenu,
                    Utilisateur_idUtilisateur: jwtDecode.id
                }
                if (data2.contenu) {
                    connection.query('INSERT INTO commentaire SET ?', data2, (err, rs) => {
                        if (err) {
                            console.log(err);
                        } else {
                            connection.query('SELECT idPublication, publication_idUtilisateur, image, intitule, description, likes, idUtilisateur, prenom, nom, email, pseudo FROM publication INNER JOIN utilisateur WHERE publication.Publication_idUtilisateur = utilisateur.idUtilisateur AND idPublication = ?', req.query.idPublication, function(err, rs) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    return res.render('pages/userfile/solo_post', { solopostobj: rs[0], message : 'Commentaire envoyé !'})
                                }
                            })
                        }
                    })
                } else {
                    return res.render('pages/userfile/solo_post', {message_err :'Contenu manquant . .', solopostobj : {} });
                }
            }
        }
    }

    static solopost(req, res) {
        var token = req.cookies.jwt;
        if (token === null) {
            return res.send('Page indisponible')
        } else {
            var jwtVerify = jwt.verify(token, process.env.JWT_SECRET);
            if (jwtVerify === null) {
                return res.send('Page indisponible')
            } else {
                connection.query('SELECT idPublication, publication_idUtilisateur, image, intitule, description, likes, idUtilisateur, prenom, nom, email, pseudo FROM publication INNER JOIN utilisateur WHERE publication.Publication_idUtilisateur = utilisateur.idUtilisateur AND idPublication = ?', req.query.idPublication, function(err, rs) {
                    if (err) {
                        console.log(err);
                    } else {
                        return res.render('pages/userfile/solo_post', { solopostobj: rs[0]})
                    }
                })
            }
        }
    }
}

module.exports = contentmodel;