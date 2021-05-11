const connection = require('../config/dbConnect')
const jwt = require('jsonwebtoken');

class contentmodel {

    static modelpost(req, res) {
        var jwtToken = req.cookies.jwt;
        if (token != null) {
            var jwtVerify = jwt.verify(jwtToken, process.env.JWT_SECRET)
            if (jwtVerify != null) {
                var jwtDecode = jwt.decode(jwtToken);
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
                res.send('Page indisponible');
            }
        } else {
            res.send('Page Indisponible')
        }

    }

    static modelsolopost(req, res) {
        var token = req.cookies.jwt;
        if (token === null) {
            return res.send('Page indisponible')
        } else {
            var jwtVerify = jwt.verify(token, process.env.JWT_SECRET);
            if (jwtVerify === null) {
                return res.send('Page indisponible')
            } else {
                var jwtDecode = jwt.decode(token);
                let data2 = {
                    // date_heure : date(now)
                    // Publication_idPublication: req.params.idPublication
                    contenu: req.body.contenu,
                    Utilisateur_idIUtilisateur: jwtDecode.id
                }
                if (data2.contenu) {
                    connection.query('INSERT INTO commentaire SET ?', data2, (err, res) => {
                        if (err) {
                            console.log(err);
                        } else {
                            return res.render('pages/userfile/solo_post', {message : 'Commentaire posté !'})
                        }
                    })
                } else {
                    return res.render('pages/userfile/solo_post', {message_err : 'Contenu manquant'})
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
                var jwtDecode = jwt.decode(token);
                connection.query('SELECT * FROM publication', (err, rs) => {
                    if (err) {
                        console.log(err);
                    } else {
                        return res.render('pages/userfile/solo_post', { solopostobj: rs[0], jwtToken: jwtDecode })
                    }
                })
            }
        }
    }
}

module.exports = contentmodel;


// Sophie je t'aime GRRRRRRFIZJFIEFEJFZFZEJOZJF <33333333333333333333
// JE T'AIME DJDOK FKPZOEFPOZEPOFZPFJPJFP