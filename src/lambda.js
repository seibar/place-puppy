import awsServerlessExpress from 'aws-serverless-express';
import app from './server/app';

app.use(function (req, res, next) {
	res.set('x-engine', 'lambda');
	next();
});

const server = awsServerlessExpress.createServer(app);

const handler = (event, context) => awsServerlessExpress.proxy(server, event, context);

export { handler };