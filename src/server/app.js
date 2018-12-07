import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import basePage from './base-page';
import Main from '../components/main';
import { ImageController } from './controllers';
import { TenantService } from './services';

const app = express();

// Config
const randomMaxAge = process.env.RANDOM_MAX_AGE || 600;
const publicPath = process.env.PUBLIC_PATH || 'public';

const imageController = new ImageController({ randomMaxAge });

process.on('uncaughtException', function(err) {
	console.log('Caught exception: ' + err);
});

app.enable('trust proxy');

app.use(function (req, res, next) {
	res.removeHeader("X-Powered-By");
	next();
});

app.use('/public', express.static(publicPath));

app.get('/', (req, res) => {
	const tenant = TenantService.getTenant(req.hostname);
	const body = ReactDOMServer.renderToString(<Main tenant={tenant} />);

	return res.status(200).send(
		basePage({ tenant, body })
	);
});

app.get('/:width/:height', (req, res, next) => imageController.getRandom(req, res, next));
app.get('/:id/:width/:height', (req, res, next) => imageController.getById(req, res, next));

// Error handling
app.use(function (error, req, res, next) {
	const now = new Date();
	console.log(`${now.toGMTString()} ${error}`);
	return res.status(500).send('Error');
});

export default app;