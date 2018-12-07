import awsServerlessExpress from 'aws-serverless-express';
import app from './server/app';

const pkg = require('./package.json');
app.locals.version = pkg.version;

app.use(function (req, res, next) {
	res.set('x-engine', 'lambda');
	next();
});

const server = awsServerlessExpress.createServer(app);

export const handler = (event, context) => awsServerlessExpress.proxy(server, event, context);