const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    username: {
		type: String,
		unique: true,
		lowercase: true,
		index: true
	},
    fullname: String,
    birthdate: Date,
    passHash: String,
    avatarLink: String,
    id: Number,
    avatar: {
        default: Boolean,
        data: Buffer,
        contentType: String
    },
    currunMemId: Number
});

UserSchema.plugin(AutoIncrement, {
	inc_field: 'id'
});
UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);