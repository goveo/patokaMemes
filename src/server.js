const express = require('express');
const app = express();
const port = process.env.PORT || 2323;

const path = require("path");

const db = require('./modules/database');
const info = require('./modules/info')
const News = require('./modules/news')


app.use(express.static(__dirname + '/../public'));
app.set('public', path.join(__dirname, '/../public'));
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'ejs');

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log('server on', port);
});

app.get('/', (req, res) => {
    res.render('index', {
        user: req.user
    });
});