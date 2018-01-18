const router = require('express').Router();
const Auth = require('../modules/auth');
const db = require('../modules/database');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const bodyParser = require('body-parser');
const isVaild = require('../modules/inputValidate')

passport.use(Auth.Strategy);
passport.serializeUser(Auth.serializeUser);
passport.deserializeUser(Auth.deserializeUser);
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

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let hash = Auth.sha512(req.body.password).passwordHash;

    db.getUserByPassHash(username, hash)
        .then(user => {
            if (!user) {
                res.json('Wrong usenrame or password');
            } else {
                console.log(user);
                passport.authenticate('local')(req, res, function () {
                    console.log('logined success');
                    res.json({
                        status: 'success'
                    });
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.json({
                status: 'error',
                message: "Sorry our server is offline =("
            });
        })
})

router.post('/register', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let hash = Auth.sha512(password).passwordHash;
    console.log('username : ', username);
    console.log('password : ', password);

    if (username == undefined || password == undefined) {
        return res.json({
            status: "error",
            message: "Some fields are emprty"
        });
    }
    if (!isVaild.checkString(username)) {
        return res.json({
            status: "error",
            message: "Invalid username"
        });
    }
    if (!isVaild.checkString(password)) {
        return res.json({
            status: "error",
            message: "Invalid password"
        });
    }

    db.createUser({
        username: username,
        passHash: hash
    })
        .then(response => {
            console.log(response);
            return res.json({
                status: "success"
            });
        })
        .catch(err => {
            return res.json({
                status: "error",
                message: "Username is already taken"
            });
        });
});

module.exports = {
    router: router
}