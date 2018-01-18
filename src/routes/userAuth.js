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
    extended: true
}));
router.use(bodyParser.json());

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let hash = Auth.sha512(req.body.password).passwordHash;

    User.getUserByPassHash(username, hash)
        .then(user => {
            if (!user) {
                res.json('Wrong usenrame or password');
            } else {
                console.log(user);
                passport.authenticate('local')(req, res, function () {
                    console.log('logined success');
                    res.json('success');
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.json('error');
        })
})

passport.serializeUser(Auth.serializeUser);
passport.deserializeUser(Auth.deserializeUser);

router.get('/logout', Auth.checkAuth, (req, res) => {
    console.log('log out');
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
    console.log('req.body.username : ', req.body.username);
    console.log('req.body.password : ', req.body.password);
    if (req.body.username == undefined || req.body.password == undefined) {
        return res.json({
            error: 'fill all fields please'
        })
    }

    let hash = Auth.sha512(req.body.password).passwordHash;

    User.isUserExist(req.body.username)
        .then(data => {
            if (data == false) {
                let obj = req.body;
                console.log(obj);
                obj.passHash = hash;
                User.create(obj)
                    .then(data => {
                        console.log(data);
                        res.json('success');
                    })
                    .catch(err => {
                        res.json('error');
                    });
            } else {
                res.json('error');
            }
        })
        .catch(err => {
            console.log("err : ");
            console.log(err);
            res.json('error');
        })
});

router.get('/profile', (req, res) => {
    res.render('profile', {
        user: req.user
    });
});

module.exports = {
    router: router
}