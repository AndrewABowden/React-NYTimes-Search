
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express ();
//Mongoose
mongoose.Promise = Promise;

var port = 3000;
var PORT = process.env.PORT || PORT;
//db 
//That darn heroku...
if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
} else { 
    mongoose.connect('mongodb://127.0.0.1:nyt19');
}

var db = mongoose.connection;

db.on('err', function(err) {
    console.log('Mong err ... sucks...')
});

//Once logged in to the db through mongoose, log success
db.on('open', function() {
    console.log('Mongoose connection succesful');
});
//static content for app from pub directory
// app.use(express.static(path.join(_dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));


let Article = require('./models/Article.js');
let Note = require('./models/Note.js');

//html
app.get('/', function(req, res) {
    res.sendFile(path.resolve('build/index.html'));
});
//grabs articles
app.get('/api/articles', function(req, res) {
    Article.find()
        .populate('noteID')
        .exec(function(err, document) {
            if (err) {
                res.send(err);
            } else { res.send(document) }
        });
});

// Delete article from db
app.delete('/api/article/:id', function (req, res) {
	Article.remove({
		_id: req.params.id
	}, function (err, doc) {
		if (err) {
			res.send(err);
		}
		else {
			res.send(doc);
		}
	});
});

// Save note to db - Under Construction
app.post('/api/note', function (req, res) {
	var newNote = new Note({
		text: req.body.text,
		articleId: req.body.articleId
	});

	newNote.save(function (error, doc) {
		if (error) {
			res.send(error);
		} else {
			Article.findOneAndUpdate({
				_id: req.body.id
			}, {
				'noteID': doc._id
			}, {
				new: true
			}, function (err, newdoc) {
				if (err) {
					res.send(err);
				}
				else {
					res.send(newdoc);
				}
			});
		}
	});
});

// Delete note from db - Under Construction
app.delete('/api/note', function (req, res) {
	Note.remove({
		_id: req.body.id
	}, function (err, doc) {
		if (err) {
			res.send(err);
		}
		else {
			res.send(doc);
		}
	});
});

// =================================================

// Start server
app.listen(PORT, function () {
	console.log('App listening on PORT ' + PORT);
});