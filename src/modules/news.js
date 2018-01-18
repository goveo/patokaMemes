"use strict";
// import {mongoose} from 'mongoose';
// import { paginate } from 'mongoose-paginate';
// import { Info } from './info';

const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');
const Info = require('./info');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const newsSchema = new Schema({
    newsId: Number,
    creatorId: Number,
    creatorName: String,
    header: String,
    body: String,
    comments: [Number]
})

newsSchema.plugin(paginate);

const News = mongoose.model("News", newsSchema);

function createNews(obj) {
    console.log(obj);
    return Info.newsId()
        .then(newsId => {
            console.log(newsId);
            let news = new News(obj);
            news.newsId = newsId;
            return news.save()
                .then(data=>{
                    Info.incNewsId();
                    return data;
                })
                .catch(err=>{
                    return err;
                })
        })
        .catch(err=>console.log(err))
}

function deleteNews(newsId) {

}

function updateNews(newsId) {

}

function addComment(newsId) {

}

function removeComment(newId, commentId) {

}

module.exports = {
    create: createNews
}