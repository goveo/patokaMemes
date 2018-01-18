const app = require('express')();
const port = process.env.PORT || 2323;
const bodyParser = require('body-parser');
const db = require('./modules/database');
const info = require('./modules/info');
const User = require('./modules/user');
app.set('view engine', 'ejs');


app.get('/login', (req, res)=>{});

app.post('/register', (req, res)=>{

})

app.listen(port, (err) => {
    if (err) console.log(err);
    console.log('server on', port);
})

