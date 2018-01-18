const router = require('express').Router();
const Auth = require('../modules/auth');
const User = require('../modules/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session')
const bodyParser = require('body-parser');


passport.use(Auth.Strategy);
router.use(cookieParser());
router.use(session({
    secret: 'SEGReT$25_',
    resave: false,
    saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());

router.use(bodyParser.urlencoded({
    extended: false
}));

router.post('/login', (req, res)=>{
    console.log(req.body);
    passport.authenticate(local, {
        successRedirect: '/sendSuccess',
        failureRedirect: '/sendFailure'
    })
})

//в клиенте отключить авторедирект и получить статус логина,
//после чего вывести инфу об ошибке или залогинить его
router.get('/sendSuccess', (req, res) => {
    res.json({
        login: 'success'
    });
})

router.get('/sendFailure', (req, res) => {
    console.log('failureeee')
    res.json({
        login: 'error'
    });
});

passport.serializeUser(Auth.serializeUser);
passport.deserializeUser(Auth.deserializeUser);

router.get('/logout', Auth.checkAuth, (req, res) => {
    req.logout();
    res.redirect('/');
})

router.get('/login', (req, res) => {
    res.render('login', {
        user: req.user
    }); 
});

router.get('/register', (req, res) => {
    res.render('register', {
        user: req.user
    });
});

router.post('/register', (req, res) => {

})

module.exports={
    router: router
}