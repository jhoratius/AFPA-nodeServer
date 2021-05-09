// CONSTANTES //
const connection = require('../config/dbConnect');
const jwt = require('jsonwebtoken');

// USER EXPORTS //

class usermodel {
    // FORM //

    static userform(req, res, next) {
        connection.query('SELECT * FROM utilisateur', function(err, rs) {
            res.render('pages/admin/utilisateur', {using: rs})
        })
    }

    // UPDATE //

    static userdelete(req, res, next) {
        connection.query('DELETE FROM utilisateur WHERE idUtilisateur = ?', req.query.idUtilisateur, function (err, rs) {
            res.redirect('/utilisateur')
        })
    };

    static useredit(req, res, next) {
        connection.query('SELECT * FROM utilisateur WHERE idUtilisateur = ?', req.query.idUtilisateur, function (err, rs) {
            console.log('data', req.body)
            res.render('pages/admin/editform', {book: rs[0] });
        })
    };

    static edit(req, res, next){
        var parametres = [
            req.body,       // data for update
            req.query.idUtilisateur    // condition for update
        ]
        let sqlQuery = 'UPDATE utilisateur SET ? WHERE idUtilisateur = ?';
        connection.query(sqlQuery, parametres,(err, rs) => {
            if(err)throw err;
            res.redirect('/utilisateur')
        })
    };

    // USER PAGES //

    static userHomepage(req, res){
        var token = req.cookies.jwt;
        var jwtVerify = jwt.verify(token, process.env.JWT_SECRET);
        var jwtDecode = jwt.decode(token);
        if(jwtVerify != null){
            var jwtToken = jwt.verify(token, process.env.JWT_SECRET);
            if(jwtToken != null){
                connection.query('SELECT * FROM publication', function(err, rs){
                    res.render('pages/userfile/userhome', {userhomeobj : rs, jwt : jwtDecode})
                    console.log('response :', rs)
                } )
                
            } else {
                return res.send('Page indisponible');
            }
        } else {
            return res.send('Page indisponible')
        }
    }

    static userProfile(req, res){
        var token = req.cookies.jwt;
        if(token === null){
            return res.send('Page indisponible')
        } else {
            var jwtVerify = jwt.verify(token, process.env.JWT_SECRET);
            var jwtDecode = jwt.decode(token);
            if(jwtVerify != null){
                connection.query('SELECT * FROM utilisateur, publication WHERE publication_idUtilisateur = 3 GROUP BY idPublication', function(err, rs){
                    if(err){
                        console.log(err)
                    } else {
                        console.log('decode :', jwtDecode)
                        res.render('pages/userfile/userprofile', {userprofileobj : rs, jwtToken : jwtDecode})
                    }
                } )
            }
        }
    }

    // DECONNEXION //

    static userDisconnect(req, res){
        const token = req.cookies.jwt;
        console.log('token :', token);
        const jwtToken = jwt.verify(token, process.env.JWT_SECRET)
        try {
            if(jwtToken != null){
                // req.cookies.set(token, {exp: Date.now()});
                if(token !== null){
                    res.send('Déconnexion impossible')
                } else {
                    res.render('pages/accueil')
                }
            }
            else{
                return res.render('pages/userfile/userprofile', {'message' : 'Déconnexion impossible'})
            }
        } catch (error) {
            console.log(error)
        }
    }
    
}

module.exports = usermodel;