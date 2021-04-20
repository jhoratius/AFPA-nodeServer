const connection = require('../config/dbConnect')

    class adminmodel {
        static adminHomepage(req, res){
            connection.query('SELECT * FROM utilisateur, publication', function(err, rs){
                res.render('pages/admin/adminhome')
            } )
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
    }

module.exports = adminmodel;