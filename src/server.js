const express = require('express');
const app = express();
const port = process.env.PORT || 2323;

const db = require('./modules/database');
const info = require('./modules/info')
const News = require('./modules/news')

app.use(express.static(__dirname + '/../public'));
app.set('view engine', 'ejs');

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log('server on', port);
});
