var rank = require('pagerank-js')
const sort = require('node-sortable')


nodes = [[1,2],[],[0,1,4],[4,5],[3,5],[3]]
linkProb = 0.95 //high numbers are more stable
tolerance = 0.0001 //sensitivity for accuracy of convergence. 

rank(nodes, linkProb, tolerance, function (err, res) {
    if (err) 
    	throw new Error(err)

    var sortResults = sort.quick(res, sort.ASC)

	console.log(sortResults)

}, debug=false)