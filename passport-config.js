// const LocalStrategy = require('passport-local').Strategy


// function initialize(passport){
//     const authenticateUser = (email, password, done) => {
//         const user = getuserByEmail(email)
//         if(user == null){
//             return done(null, false, {message : "No user with that email"})
//         }

//         try {
//             if(await bcrypt.compare(password, user.password)){

//             }else{
//                 return done(null, false, {message : 'Password incorrect'})
//             }
//         } catch (error) {
//             return done(error)
//         }
//     }

//     passport.use(new LocalStrategy({ usernameField : 'email'}), authenticateUser)
//     passport.serializeUser((user, done) => { })
//     passport.serializeUser((id, done) => { })
// }

// module.exports = initialize;