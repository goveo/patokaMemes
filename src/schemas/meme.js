const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const MemeSchema = new Schema({
    id: Number,
    url: String,
    votes: {
        pros: Number,
        cons: Number
    }
});

MemeSchema.plugin(AutoIncrement, {
	inc_field: 'id'
});
MemeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Mem', MemeSchema);