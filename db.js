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

Note = new Schema({
  _id: { type: ObjectId, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: new Date() }
});

mongoose.model('Notes', Note, 'Notes');

mongoose.connect('mongodb://localhost/dailynotes');