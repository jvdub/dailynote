var mongoose = require('mongoose'),
  url = require('url'),
  notes = mongoose.model('Notes'),
  notFound = {
    _id: 0,
    title: 'Not Found',
    text: 'No notes were found.',
    date: new Date()
  };

exports.get = function (req, res, next) {
  notes
    .find(function (err, notes) {
      if(err) { return next(err); }

      res.writeHead(200, { 'content-type': 'text/json' });

      if (notes && notes.length > 0) {
        res.end(JSON.stringify(notes));
      }
      else {
        res.end(JSON.stringify([notFound]));  
      }
    });
};

exports.getNote = function (req, res, next) {
  notes
    .findOne({ _id: new mongoose.Types.ObjectId(req.params.id) })
    .exec(function (err, note) {
      if(err) { return next(err); }

      res.writeHead(200, { 'content-type': 'text/json' });

      if (note) {
        res.end(JSON.stringify(note));
      }
      else {
        res.end(JSON.stringify(notFound));  
      }
    });
};

exports.addNote = function (req, res, next) {
  console.log(req);
  var newItem = new notes(req.body);
  newItem._id = new mongoose.Types.ObjectId();

  newItem.save(function (err) {
    if(err) { return next(err); }

    res.statusCode = 201;
    res.end();
  });
};