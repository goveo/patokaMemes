const memes = require('dankmemes');
const getTopMemes = function(numberOfMemes) {
    memes('day', numberOfMemes, function(err, data) {
        // console.log("The 2 most dankest memes of the day: " + );
        return JSON.stringify(data);
    });
}

module.exports = {
    getTopMemes: getTopMemes
};