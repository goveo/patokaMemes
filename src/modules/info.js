const mongoose = require('mongoose');
require('dotenv').load();

mongoose.Promise = global.Promise;


const InfoDoc = require('../schemas/info').Info;

function getuserId() {
    return InfoDoc.findById(infoDocId)
        .then(data => {
            return Promise.resolve(data.userId);
        })
        .catch(err => {
            return Promise.reject(err);
        })
}

function incUserId() {
    let upd = {
        $inc:{
            userId: 1
        }
    };
    InfoDoc.update({_id: infoDocId}, upd)
        .then(data=>console.log(data))
        .catch(err=>console.log(err));
}

module.exports = {
    userId: getuserId,
    incUserId: incUserId
}