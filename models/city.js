var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var city = new Schema({
	name: { type: String, unique: true, required: true },
	cal: { type: Schema.Types.Mixed, required: true }
});

module.exports = mongoose.model('City', city);

