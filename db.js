var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

function validatePresenceOf(value) {
	return value && value.length;
}

function is(type, obj) {
	var clas = Object.prototype.toString.call(obj).slice(8, -1).toLocaleLowerCase();
	return obj !== undefined && obj !== null && clas === type;
}

