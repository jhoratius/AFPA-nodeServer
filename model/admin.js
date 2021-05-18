const connection = require('../config/dbConnect')

    class adminmodel {

        static adminHomepage(req, res){
            connection.query('SELECT * FROM utilisateur, publication', function(err, rs){
                res.render('pages/admin/adminhome')
            } )
        }

        static tableUtilisateur(req, res){
            connection.query('SELECT * FROM utilisateur', function (err, rs) {
                res.render('pages/admin/utilisateur', { using: rs })
            })
        }

        static tablePublication (req, res){
            connection.query('SELECT * FROM publication', function(err, rs) {
                res.render('pages/admin/publication', {publi: rs})
            })
        }

        static tableCommentaire(req, res){
            connection.query('SELECT * FROM commentaire', function(err, rs) {
                res.render('pages/admin/commentaire', {comment: rs})
            })
        }
 

        static userdelete(req, res, next) {
            connection.query('DELETE FROM utilisateur WHERE idUtilisateur = ?', req.query.idUtilisateur, function (err, rs) {
                res.redirect('/utilisateur')
            })
        };
    
        static useredit(req, res, next) {
            connection.query('SELECT * FROM utilisateur WHERE idUtilisateur = ?', req.query.idUtilisateur, function (err, rs) {
                res.render('pages/admin/editform', { book: rs[0] });
            })
        };

        static edit(req, res, next) {
            var parametres = [
                req.body,       // data for update
                req.query.idUtilisateur    // condition for update
            ]
            let sqlQuery = 'UPDATE utilisateur SET ? WHERE idUtilisateur = ?';
            connection.query(sqlQuery, parametres, (err, rs) => {
                if (err) throw err;
                res.redirect('/utilisateur')
            })
        };
    }

module.exports = adminmodel;