var MongoClient = require('mongodb').MongoClient
var assert = require('assert');

var initialOffsetDays = 8

var lastDateOffset = (24*60*60*1000) * initialOffsetDays
var lastRequestOffsetDate = new Date(new Date() - lastDateOffset)

var sevenDays = (24*60*60*1000) * (initialOffsetDays - 1)

var lastPosts = []

var timerLength = 33013

var update = function(posts) {
	//todo: need to implement callback?
	var urimSteem = 'mongodb://localhost/mSteem'

	MongoClient.connect(urimSteem, function(err, db) {
		assert.equal(null, err);		
		console.log("localhost [C]");

		db.collection('Posts', function(err, collection) {

			collection.remove();

			posts.forEach(function(post) {

			collection.insert(post)

			})

			if(!err){
				db.close()
				console.log("localhost [D]")
			}
		})

	})

}

var activePosts = function(callback) {
	var uriSteemData = 'mongodb://steemit:steemit@mongo1.steemdata.com/SteemData'

	var newPosts = []

	MongoClient.connect(uriSteemData, function(err, db) {
		assert.equal(null, err);		
		console.log("SteemData [C]");


		var dateNow =  new Date();

		var sevenDayoffSetDate = new Date(dateNow - sevenDays)

		var	offSetDate = lastRequestOffsetDate

		if(sevenDays < lastDateOffset)
		{
			offSetDate = sevenDayoffSetDate
		}

		lastDateOffset = dateNow - offSetDate

		lastRequestOffsetDate = dateNow

		db.collection('Posts').find(
			{ created: { $gte: offSetDate } }, 
			{ created: 1, author: 1, url: 1, json_metadata: 1 }
		).toArray(function(err, docs) {

			if(!err){
				db.close()
				console.log("SteemData [D]")

				if(docs.length > 0) {
					docs.forEach(function(value) {
						var post = parsePost(value.created, value.author, value.url, value.json_metadata)

						newPosts.push(post)
					})

					lastPosts = insertPosts(sevenDayoffSetDate, newPosts)
					
				}

				callback(lastPosts)
			}		
		})
	})
}

var insertPosts = function(sevenDayoffSetDate, newPosts) {
	var newLastPosts = []

	lastPosts.forEach(function(post) {
		if(post.createDate >= sevenDayoffSetDate)
		{
			newLastPosts.push(post)
		}
	})

	newPosts.forEach(function(post) {
		newLastPosts.push(post)
	})

	return newLastPosts
}

var parsePost = function(createDate, author, url, json_metadata) {
	var post = {}

	post = {
		createDate: createDate,
		author: author,
		url: 'https://steemit.com' + url,
		links: [],
		tags: []
	}

	if(!isEmptyObject(json_metadata))
	{
		if(!isEmptyObject(json_metadata.links))
		{
			post['links'] = json_metadata.links
			post['tags'] = json_metadata.tags
		}
	}

	return post
}	

function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

var runner = function() {
	activePosts(function(posts) {
		update(posts)
		console.log("Found: " + posts.length)
	})
}

var start = function() {
	console.log('Start...')
	runner()
}

start()

var interval = setInterval(function() {
	runner()
}, timerLength)

//clearInterval(interval)


