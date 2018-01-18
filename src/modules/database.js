const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');
require('dotenv').load();
console.log(process.env.DB_LINK);
mongoose.connect(process.env.DB_LINK, { useMongoClient: true }, (err) => {
    if (err) {
        return console.log(err)
    } else {
        return console.log('db connected');
    };
})