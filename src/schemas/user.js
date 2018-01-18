const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const userSchema = new Schema({
    username: String,
    fullname: String,
    birthdate: Date,
    passHash: String,
    avatarLink: String,
    id: Number
})

const User = mongoose.model("User", userSchema);

module.exports = {
    User: User
}