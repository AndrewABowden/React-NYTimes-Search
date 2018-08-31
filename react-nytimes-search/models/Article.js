var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	noteID: [{
		type: Schema.Types.ObjectId,
		ref: 'Note'
	}]
}, {
	timestamps: true
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;