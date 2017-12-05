import http from 'http';
import express from 'express';
import { homeView } from './views';
import { ImageController } from './controllers';
import images from './images.json';

const app = express();
const server = http.createServer(app);

// Config
const port = process.env.PORT || 3000;
const maxAge = process.env.RANDOM_MAX_AGE || 60 * 60 * 24;

const imageController = new ImageController({ maxAge });

process.on('uncaughtException', function(err) {
	console.log('Caught exception: ' + err);
});

app.enable('trust proxy');

app.use(function (req, res, next) {
	res.removeHeader("X-Powered-By");
	next();
});

app.get('/', (req, res) => {
	return res.status(200).send(homeView({ title: 'place a puppy', imageIds: images.puppies }));
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