const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');
require('dotenv').load();
mongoose.connect(process.env.DB_LINK, { useMongoClient: true }, (err) => {
    if (err) {
        return console.log('err:', err)
    } else {
        return console.log('db connected');
    };
})