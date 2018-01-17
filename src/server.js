const app = require('express')();
const port = process.env.PORT || 2323;
const db = require('./modules/database');
const info = require('./modules/info')

app.use('view engine', 'ejs');

app.listen(port, (err)=>{
    if(err) console.log(err);
    console.log('server on', port);
})