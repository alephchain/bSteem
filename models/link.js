var db = require('../db')

var Link = db.model('Link', {
	externalId: {type: String, required: true },
	from: {type: String, required: true},
	link: {type: String, required: true},
	comment: {type: String, required: false},
	timestamp: {type: Date, required: true, defualt: Date.now }
)

module.exports = Link