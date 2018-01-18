const cookieParser = require('cookie-parser');
const session = require('express-session');
const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./user');

const serverSalt = "oZlAprrO5f";

function sha512(password) {
    const hash = crypto.createHmac('sha512', serverSalt);
    hash.update(password);
    const value = hash.digest('hex');
    return {
        passwordHash: value
    };
};

function serializeUser(user, done) {
    done(null, user.id);
};

function deserializeUser(id, done) {
    User.getById(id)
        .then(user => {
            done(user ? null : 'No user', user);
        })
        .catch(err => {
            // console.log('err in deserialize:', err)
            if (err == 'no user with this index') {
                Band.getById(id)
                    .then(user => {
                        done(user ? null : 'No band', user);
                    })
            }
        });
};

function checkAuth(req, res, next) {
    if (!req.user) return res.render('errorPage', {
        user: req.user,
        error_code: 401,
        error_message: `You are not authorized, go on login page and do it or create an account if you don't have one`,
        visit: false
    }).sendStatus(401);
    next();
}

const Strategy = new LocalStrategy(
    function (username, password, done) {
        let hash = sha512(password).passwordHash;
        User.getUserByUsernameAndHash(username, hash)
            .then(user => {
                console.dir(user);
                if (!user) {
                    console.log('no user')
                    Band.getByUsernameAndHash(username, hash)
                        .then(band => {
                            console.log('band searching:', band)
                            if (!band) {
                                console.log('band here')
                                return done(null, false);
                            } else {
                                console.log('band not here')
                                return done(null, band)
                            }
                        })
                        .catch(err => {
                            console.log('band login err:', err)
                        })
                    // return done(null, false);
                } else {
                    return done(null, user);
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
)