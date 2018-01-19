const memes = require('dankmemes');
memes('day', 10, function(err, data) {
    console.log("The 2 most dankest memes of the day: " + JSON.stringify(data));
});