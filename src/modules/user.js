const mongoose = require('mongoose');
const Info = require('./info');
let User = require('../schemas/user').User;
mongoose.Promise = global.Promise;

function createUser(object) {
    console.log(object);
    return Info.userId()
        .then(userId => {
            console.log('id:', userId);
            let tmp = new User(object);
            tmp.id = userId;
            tmp.save((err, data) => {
                if (err) {
                    console.log(err);
                    return Promise.reject(err)
                } else {
                    Info.incUserId();
                    return Promise.resolve(data);
                }
            })
        })
        .catch(err => {
            console.log(err);
            return Promise.reject(err);
        })
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

function getUserByPassHash(username, passHash) {
    return User.find({ 
        username: username, 
        passHash: passHash 
    })
    .then(data=>{
        if(data.length===0){
            return Promise.reject('wrong data');
        }else{
            return Promise.resolve(data[0]);
        }
    })
    .catch(err=>{
        console.log(err);
        return Promise.reject(err);
    })
};

module.exports = {
    create: createUser,
    getUserByPassHash: getUserByPassHash,
    getById: getUserById
}