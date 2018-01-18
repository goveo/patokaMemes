const mongoose = require('mongoose');
const User = require('../schemas/user').User;

require('dotenv').load();
mongoose.connect(process.env.DB_LINK, (err) => {
    if (err) {
        return console.log('err:', err)
    } else {
        return console.log('db connected');
    };
});
mongoose.Promise = global.Promise;

function createUser(object) {
    return new Promise((resolve, reject) => {
        let user = new User(object);
        user.save((err, data) => {
            if (err) {
                console.log(err);
                reject({
                    message: 'Username is already taken.',
                    status: 402
                });
            }
            resolve(data);
        });
    });
}

function getUserById(userId) {
    return User.find({ id: userId })
        .then(data => {
            if (data.length === 0) {
                return Promise.resolve('no user');
            }
            return Promise.resolve(data[0]);
        })
        .catch(err => {
            console.log(err);
            return Promise.reject(err);
        })
}

function isUserExist(username) {
    return User.findOne({
        username: username
    })
        .then(data => {
            if (data == null) {
                return Promise.resolve(false);
            }
            else {
                return Promise.resolve(true);
            }
        })
        .catch(err => {
            console.log(err);
            return Promise.reject(err);
        })
}

function getUserByPassHash(username, passHash) {
    return User.find({
        username: username,
        passHash: passHash
    })
        .then(data => {
            if (data.length === 0) {
                return Promise.reject('wrong data');
            } else {
                return Promise.resolve(data[0]);
            }
        })
        .catch(err => {
            console.log(err);
            return Promise.reject(err);
        })
};

module.exports = {
    createUser: createUser,
    getUserByPassHash: getUserByPassHash,
    getById: getUserById,
    isUserExist: isUserExist
}