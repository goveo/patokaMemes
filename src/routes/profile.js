const router = require('express').Router();
const Auth = require('../modules/auth');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const bodyParser = require('body-parser');
const isVaild = require('../modules/inputValidate')

router.use(cookieParser());
router.use(session({
    secret: 'SEGReT$25_',
    resave: false,
    saveUninitialized: true
}));

router.use(bodyParser.urlencoded({
    extended: true
}));

router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.render('profile', {
        user: req.user
    });
});

module.exports = {
    router: router
}