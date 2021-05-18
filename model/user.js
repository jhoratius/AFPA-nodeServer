// CONSTANTES //
const connection = require('../config/dbConnect');
const jwt = require('jsonwebtoken');

// USER EXPORTS //

class usermodel {

    // UPDATE //

    static updateprofile(req, res, next) {
        var jwtToken = req.cookies.jwt;
        if(jwtToken != null){
            var jwtVerify = jwt.verify(jwtToken, process.env.JWT_SECRET);
            if(jwtVerify != null){
                var idUtilisateur = req.query.idUtilisateur;
                var jwtDecode = jwt.decode(jwtToken)
                connection.query('SELECT nom, prenom, pseudo FROM utilisateur WHERE idUtilisateur = ?', idUtilisateur, function (err, rs) {
                res.render('pages/userfile/updateProfile', { userupdateobj: rs[0], jwtToken : jwtDecode });
        })
            }
        }
        
    }

    // USER PAGES //

    static userHomepage(req, res) {
        var jwtToken = req.cookies.jwt;
        if (jwtToken !== null) {
            var jwtVerify = jwt.verify(jwtToken, process.env.JWT_SECRET);
            if (jwtVerify !== null) {
                var jwtDecode = jwt.decode(jwtToken);
                connection.query('SELECT idPublication, publication_idUtilisateur, image, intitule, description, likes, idUtilisateur, prenom, nom, email, pseudo FROM publication LEFT JOIN utilisateur ON publication.Publication_idUtilisateur = utilisateur.idUtilisateur GROUP BY idPublication', function (err, rs) {
                    console.log('result :', rs);
                    return res.render('pages/userfile/userhome', { userhomeobj: rs, jwt: jwtDecode })
                })
            } else {
                    return res.status(400).redirect({ message : 'Impossible de vérifier le cookie' })
            }
        } else {
            return res.send('Page indisponible');
        }
    }

    static userprofile(req, res) {
    var token = req.cookies.jwt;
    if (token === null) {
        return res.send('Page indisponible')
    } else {
        var jwtVerify = jwt.verify(token, process.env.JWT_SECRET);
        if (jwtVerify != null) {
            var jwtDecode = jwt.decode(token);
            connection.query('SELECT * FROM utilisateur, publication WHERE publication_idUtilisateur = ? AND idUtilisateur = publication_idUtilisateur', jwtDecode.id, function (err, rs) {
                if (err) {
                    console.log(err)
                } else {
                    return res.render('pages/userfile/userprofile', { userprofileobj: rs, jwtToken: jwtDecode })
                }
            })
        }
    }
}

    // DECONNEXION //

    static userDisconnect(req, res) {
    const token = req.cookies.jwt;
    const jwtToken = jwt.verify(token, process.env.JWT_SECRET)
    try {
        if (jwtToken != null) {
            // req.cookies.set(token, {exp: Date.now()});
            if (token !== null) {
                res.send('Déconnexion impossible')
            } else {
                res.render('pages/accueil')
            }
        }
        else {
            return res.render('pages/userfile/userprofile', { 'message': 'Déconnexion impossible' })
        }
    } catch (error) {
        console.log(error)
    }
}

    static deleteaccount(req, res){
        const token = req.cookies.jwt;
        console.log('token :', token);
        try {
            if (token !== null) {
                var jwtToken = jwt.verify(token, process.env.JWT_SECRET);
                if (jwtToken != null){
                    var jwtDecode = jwt.decode(token);
                    console.log('decode :', jwtDecode);
                    connection.query('DELETE * FROM utilisateur WHERE idUtilisateur = jwtDecode.id', (err, result) =>{
                        return res.render('pages/accueil')
                    })
                } else {
                    return res.send('Suppression du compte impossible')
                }
            } else {
                return res.render('pages/userfile/userprofile', { 'message': 'Cookie introuvable' })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = usermodel;