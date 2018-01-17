import mongoose from 'mongoose';
import paginate from 'mongoose-paginate';
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

function createNews(obj){
    
}