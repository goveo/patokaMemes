const mongoose = require('mongoose');
require('dotenv').load();

const Schema = mongoose.Schema;

const infoDocSchema = new Schema({
    userId: Number
})

const InfoDoc = mongoose.model("InfoDoc", infoDocSchema);

module.exports = {
    Info: InfoDoc
}