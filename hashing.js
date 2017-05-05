var crypto = require('crypto');
var dict = {}

var name = 'https://steemit.com/music/@vickaboleyn/soundtracks-that-you-may-enjoy-and-may-inspire-you-for-writing-a-story-ii-the-hunchback-of-notre-dame-by-hans-zimmer';
var hash = crypto.createHash('md5').update(name).digest('hex');

dict[hash] = name

console.log(dict)
console.log()

dict[hash] = name + ' test'

console.log(dict)