const mongoose = require('mongoose');
require('dotenv').load();
mongoose.connect(process.env.DB_LINK, (err) => {
    if (err) {
        return console.log('err:', err)
    } else {
        return console.log('db connected');
    };
})