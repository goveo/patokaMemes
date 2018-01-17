const mongoose = require('mongoose');
require('dotenv').load();

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const infoDocId = process.env.INFODOC_OBJ_ID;
const infoDocSchema = new Schema({
    newsId: Number,
    commentId: Number
})

const InfoDoc = mongoose.model("InfoDoc", infoDocSchema);

let obj = {
    newsId: 0,
    commentId: 0
}

function getNewsId() {
    return InfoDoc.findById(infoDocId)
        .then(data => {
            return data.newsId;
        })
        .catch(err => {
            return err;
        })
}

function getCommentId() {
    return InfoDoc.findById(infoDocId)
        .then(data => {
            return data.commentId;
        })
        .catch(err => {
            return err;
        })
}

function updateNewsId() { 
    let upd = {
        $inc: {
            newsId: 1
        }
    }
    InfoDoc.update({_id: infoDocId}, upd, (err, data)=>{
        if(err) return console.log(err);
        return console.log(data);
    });
};

function updateCommentId() { 
    let upd = {
        $inc: {
            commentId: 1
        }
    }
    InfoDoc.update({_id: infoDocId}, upd, (err, data)=>{
        if(err) return console.log(err);
        return console.log(data);
    });
};

module.exports = {
    newsId: getNewsId,
    commentId: getCommentId,
    incNewsId: updateNewsId,
    incCommentId: updateCommentId
}