const axios = require("axios");
function getMeme(page, id) {
    let url = 'https://api.imgur.com/3/g/memes/top/' + page; //need to fix later
    return axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'CLIENT-ID 66cf648f30b3bd9' //need to fix later
        }
    })
    .then((data) => {
        console.log('axios data : ', data);
        return Promise.resolve(data)
    })
    .catch((err) => {
        return Promise.reject(err);
    });
};

module.exports = {
    getMeme: getMeme
};