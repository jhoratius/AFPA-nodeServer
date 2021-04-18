// CONSTANTES //
const connection = require('../config/dbConnect');

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
        connection.query('SELECT * FROM utilisateur, publication', function(err, rs){
            res.render('pages/userfile/userhome')
        } )
    }
    static adminHomepage(req, res){
        connection.query('SELECT * FROM utilisateur, publication', function(err, rs){
            res.render('pages/admin/adminhome')
        } )
    }
}

module.exports = usermodel;