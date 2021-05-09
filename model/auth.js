const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const connection = require('../config/dbConnect')

// USER EXPORTS //

class authmodel {

    static registermodel(req, res) {
        if(req.body.prenom && req.body.nom && req.body.email && req.body.password1 && req.body.password2 && req.body.pseudo){
            const {prenom, nom, email, password1, password2, pseudo, role} = req.body;
            connection.query('SELECT email FROM utilisateur WHERE email = ?', [email], async (error, results) => {
                if(error){
                    console.log(error)
                }
                if(results.length > 0){
                    return res.render('pages/userfile/user', {
                        message_err : 'Cet email est déjà utilisé'
                    })
                } else if(password1 !== password2){
                    return res.render('pages/userfile/user', {
                        message_err : 'Les mots de passe ne correspondent pas'
                   });
                };
        
                let hashedPW = await bcrypt.hash(password1, 8);
                console.log(req.body, 'hashedPW :' + hashedPW);
                
                connection.query('INSERT INTO utilisateur SET ?', {nom: nom, prenom: prenom, email: email, password : hashedPW, pseudo: pseudo, role : role}, (error, results) => {
                    if(error){
                        console.log(error);
                    } else{
                        return res.render('pages/userfile/user', {
                            message : 'Utilisateur enregistré'
                        });
                    }
                })
            })
        } else {
            return res.render('pages/userfile/user', {
                message_err : "Un des champs requis n'a pas été rempli"
            })
        }
    }

    static loginmodel(req, res){
        
        try {
            const {email, password} = req.body;
            if( !email || !password){
                return res.status(400).render('pages/userfile/login', {
                    message_err : "Vous n'avez pas remplis tous les champs."
                })
            }
            connection.query('SELECT * FROM utilisateur WHERE email = ?', [email], async (error, results) => {
                console.log("res :", results);
                var comparaison = await bcrypt.compare(password, results[0].password);
                if(!results || !comparaison) {
                    res.status(401).render('pages/userfile/login', {
                        message_err : "L'adresse e-mail ou le mot de passe est incorrect"
                    })
                } else {
                    const idUtilisateur = results[0].idUtilisateur, Role = results[0].Role, Pseudo = results[0].pseudo;
                    const token = jwt.sign({id: idUtilisateur, role: Role, pseudo : Pseudo}, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    });

                    console.log("The token is: " + token);

                    const cookieOptions = {
                        expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookieOptions);

                    const role = results[0].Role;
                    if(role === 'Administrateur'){
                       return res.status(200).redirect("/adminhome")
                    } else {
                        return res.status(200).redirect("/userhome")
                    }
                }
            })
        }
        catch (error) {
            console.log(error)
        }

    }
    
}

module.exports = authmodel;