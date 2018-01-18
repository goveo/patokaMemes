const mongoose = require('mongoose');
require('dotenv').load();

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const infoDocId = process.env.INFODOC_OBJ_ID;
const infoDocSchema = new Schema({
    userId: Number
})

const InfoDoc = mongoose.model("InfoDoc", infoDocSchema);

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