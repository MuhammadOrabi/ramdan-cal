var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var city = new Schema({
	name: {type: String, unique: true},
	cal: [Schema.Types.Mixed]
});

module.exports = mongoose.model('City', city);

