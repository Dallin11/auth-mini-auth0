const express = require("express"),
    session = require("express-session"),
    passport = require("passport"),
    Auth0Strategy = require("passport-auth0")


const app = express();

app.use(session({
    secret: "Doggy dog dog"
}))
app.use(passport.initialize())

app.use(passport.session())



passport.use(new Auth0Strategy({
    domain: "dallin.auth0.com",
    clientID: "z7YgKOP6coy73WLjtgu6a6KOyMvclwO4",
    clientSecret: "Doggy dog dog",
    callbackUrl: "http://localhost:3000/auth/callback"
}, function(assesToken, refreshToken, extraParams, profile, done){
    return done(null, profile);
}));


app.get('/auth', passport.authenicate('auth0'));


app.get('/auth/callback',
passport.authenticate('auth0', {successRedirect: '/'}), function(req, res){
    res.status(200).send(req.user);
})

app.get('/auth/me', function(req, res){
    if(!req.user) return res.sendStatus(404);
    res.status(200).send(req.user);
})

app.get('/auth/logout', function(req, res){
     req.logout();
     res.redirect('/');
     
})


app.listen(3000, function(){
   console.log("Connected on 3000")    
})