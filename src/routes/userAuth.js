const router = require('express').Router();
const Auth = require('../modules/auth');
const User = require('../modules/user');
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

router.post('/login', (req, res) => {
    console.log(req.body);

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
    console.log(req);
    console.log('req.body.username : ', req.body.username);
    console.log('req.body.password : ', req.body.password);
    if (req.body.username == undefined || req.body.password == undefined) {
        return res.json({
            error: 'fill all fields please'
        })
    }
    if(!isVaild.checkString(req.body.username)){
        return res.json({
            error: "invalid username"
        })
    } 
    if(!isVaild.checkString(req.body.password)){
        return res.json({
            error: "invalid password"
        })
    }
    
    let obj = req.body;
    console.log(obj);
    let hash = Auth.sha512(req.body.password).passwordHash;
    obj.passHash = hash;
    User.create(obj)
        .then(data => {
            res.json({
                data: data
            });
        })
        .catch(err => {
            res.json({
                error: 'err'
            });
        });
});

module.exports = {
    router: router
}