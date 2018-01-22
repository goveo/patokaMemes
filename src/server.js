const express = require('express');
const app = express();
const port = process.env.PORT || 2323;
const bodyParser = require('body-parser');
const path = require("path");
const expressUpload = require('express-fileupload');
const User = require('./schemas/user');

const db = require('./modules/database');
const Auth = require('./modules/auth');
const memes = require('./modules/memes');

app.use(express.static(__dirname + '/../public'));
app.use(expressUpload());
app.set('public', path.join(__dirname, '/../public'));
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'ejs');

app.use('/', require('./routes/auth').router);
app.use('/profile', require('./routes/profile').router);

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log('server on', port);
});

app.get('/', (req, res) => {

    // db.createMeme('https://pp.userapi.com/c841121/v841121762/59c30/-mQOdwUajZs.jpg')
    //     .then((response) => {
    //         console.log(response);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    db.getMeme(1)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });

    res.render('index', {
        user: req.user
    });
});

app.get('/users/:id', Auth.checkAuth, (req, res) => {
    let id = parseInt(req.params.id);
    res.render('userPage', {
        user: req.user,
        userID: id
    });
});

app.get('/users/:id/avatar', Auth.checkAuth, function (req, res) {
    try {
        User.findOne({
            id: req.params.id
        }, function (err, user) {
            if (err) {
                res.send(err);
            } else if (user.avatar == undefined || user.avatar.default == true) {
                res.sendFile(path.join(__dirname, '../public/images/default_avatar.png'));
            } else {
                // res.setHeader('Cache-Control', 'public, max-age=3000000');
                res.contentType(user.avatar.contentType);
                res.send(user.avatar.data);
            }
        });

    } catch (err) {
        console.log('avatar error : ', err);
        res.send(err);
    }
});
