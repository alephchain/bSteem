var mongoose = require('mongoose')

mongoose.connect('mongodb://steemit:steemit@mongo0.steemdata.com/Steem', function() {
	console.log('mongodb connected')
})

module.exports = mongoose