import http from 'http';
import express from 'express';
import { S3 } from 'aws-sdk';
import home from './home';
import { puppies } from './puppies.json';

const app = express();
const server = http.createServer(app);
const s3 = new S3();

// Config
const port = process.env.PORT || 3000;
const maxAge = process.env.RANDOM_MAX_AGE || 60 * 60 * 24;

app.use(function (req, res, next) {
	res.removeHeader("X-Powered-By");
	next();
});

app.get('/', (req, res) => {
	return res.status(200).send(home());
});

app.get('/:width/:height', (req, res) => {
	const width = parseFloat(req.params.width);
	const height = parseFloat(req.params.height);
	if (!Number.isInteger(width) || !Number.isInteger(height)) {
		return res.sendStatus(400);
	}

	// TODO: resize image dimensions, cache them in S3. https://github.com/lovell/sharp
	// TODO: max image dimensions
	// TODO: id endpoint

	const ifModifiedSince = new Date(req.get('If-Modified-Since'));
	const now = new Date();
	const age = now - ifModifiedSince;
	if (age < maxAge * 1000) {
		return res.sendStatus(304);
	}

	res.setHeader('Content-Type', 'image/jpeg');
	res.setHeader('Cache-Control', ` max-age=${maxAge}, public`);
	res.setHeader('Expires', new Date(Date.now() + maxAge * 1000).toUTCString());
	res.setHeader('Last-Modified', new Date().toUTCString());
	const randomPuppyFilename = puppies[Math.floor(Math.random() * puppies.length)];

	const puppyStream = s3.getObject({
		Bucket: 'place-puppy',
		Key: randomPuppyFilename
	}).createReadStream();
	puppyStream.pipe(res);
});

server.listen(port);
console.log(`Listening at http://localhost:${port}`);