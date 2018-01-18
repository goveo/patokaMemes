// require("dotenv").load();
// console.log(process.env.DB_LINK)
var gag = require('node-9gag')

gag.section('hot', function (err, res) {
    // res = [
    //   {
    //     title: null,
    //     id: null,
    //     url: null,
    //     image: null,
    //     points: null,
    //     commentCount: null
    //   }
    // ]
    console.log(res);
    console.log(err)
  });