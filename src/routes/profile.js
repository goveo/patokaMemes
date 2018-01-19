const router = require('express').Router();
const Auth = require('../modules/auth');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const bodyParser = require('body-parser');
const isVaild = require('../modules/inputValidate');
const User = require('../modules/database');

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

router.get('/', Auth.checkAuth, (req, res) => {
    res.render('profile', {
        user: req.user
    });
});

router.post('/updateAvatar', Auth.checkAuth, (req, res) => {
    if (req.files.avatar == undefined) {
        return res.json({
            error: 'empty avatar field'
        })
    };
    let userID = parseInt(req.user.id, 10);
    let contentType = req.files.avatar.mimetype;
    let avatarData = req.files.avatar.data;
    User.updateAvatar(userID, contentType, avatarData)
        .then(data => {
            return res.json({
                status: 'updated'
            })
        })
        .catch(err => {
            console.log('avatar updating error:', err);
            return res.json({
                error: 'error updating avatar'
            })
        })
});

module.exports = {
    router: router
}