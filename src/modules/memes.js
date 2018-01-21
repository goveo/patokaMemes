const axios = require("axios");
function getMeme(page, id) {
    let url = 'https://api.imgur.com/3/g/memes/top/' + page; //need to fix later
    axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'CLIENT-ID 66cf648f30b3bd9' //need to fix later
        }
    }).then((response) => {
        // If request is good...
        console.log(response.data.data[id].images[0].link); //image link
    })
        .catch((error) => {
            console.log(error);
        });
};

module.exports = {
    getMeme: getMeme
}

