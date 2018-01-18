const mongoose = require('mongoose');
const User = require('../schemas/user').User;
mongoose.Promise = global.Promise;

function createUser(object) {
    let user = new User(object);
    user.id = userId;
    user.save((err, data) => {
        if (err) {
            console.log(err);
            return Promise.reject({
                message: 'Username is already taken.',
                status: 402
            });
        } else {
            return Promise.resolve(data);
        }
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
    create: createUser,
    getUserByPassHash: getUserByPassHash,
    getById: getUserById,
    isUserExist: isUserExist
}