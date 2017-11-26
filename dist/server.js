'use strict';var _http = require('http');var _http2 = _interopRequireDefault(_http);
var _express = require('express');var _express2 = _interopRequireDefault(_express);
var _views = require('./views');
var _controllers = require('./controllers');
var _images = require('./images.json');var _images2 = _interopRequireDefault(_images);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const app = (0, _express2.default)();
const server = _http2.default.createServer(app);

// Config
const port = process.env.PORT || 3000;
const maxAge = process.env.RANDOM_MAX_AGE || 60 * 60 * 24;

const imageController = new _controllers.ImageController({ maxAge });

process.on('uncaughtException', function (err) {
	console.log('Caught exception: ' + err);
});

app.use(function (req, res, next) {
	res.removeHeader("X-Powered-By");
	next();
});

app.get('/', (req, res) => {
	return res.status(200).send((0, _views.homeView)({ title: 'place a puppy', imageIds: _images2.default.puppies }));
});

app.get('/:width/:height', (req, res, next) => imageController.getRandomPuppy(req, res, next));
app.get('/:id/:width/:height', (req, res, next) => imageController.getPuppyById(req, res, next));

// Error handling
app.use(function (error, req, res, next) {
	console.log(error);
	return res.status(500).send('Error');
});

server.listen(port);
console.log(`Listening at http://localhost:${port}`);