const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const userSchema = new Schema({
    username: String,
    fullname: String,
    birthdate: Date,
    passHash: String,
    avatarLink: String,
    id: Number
});

UserSchema.plugin(AutoIncrement, {
	inc_field: 'id'
});
UserSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", userSchema);

module.exports = {
    User: User
}