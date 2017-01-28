var fs = require('fs')
var parsedJSONs = require('./virtualOperations.json')

var fields = parsedJSONs['fields']

var jsonVO = {}

fields.forEach(function(field) {
	jsonVO[field.name] = { type: field['types']}
}) 

var json = JSON.stringify(jsonVO)

fs.writeFile('virtualOperationsSchema.json', json, 'utf8')