# mongodb-read-preference [![][travis_img]][travis_url] [![][npm_img]][npm_url]

> MongoDB Read Preferences.

## Example

```javascript
var ReadPreference = require('mongodb-read-preference');
console.log(ReadPreference.primary.slaveOk());
>>> false
console.log(ReadPreference.secondary.slaveOk());
>>> true
```

## License

Apache 2

[travis_img]: https://img.shields.io/travis/mongodb-js/read-preference.svg?style=flat-square
[travis_url]: https://travis-ci.org/mongodb-js/read-preference
[npm_img]: https://img.shields.io/npm/v/mongodb-read-preference.svg?style=flat-square
[npm_url]: https://www.npmjs.org/package/mongodb-read-preference
