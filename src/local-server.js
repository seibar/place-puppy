import app from './server/app';
app.locals.version = 'local';

const port = process.env.PORT || 3000;

app.listen(port);
console.log(`Listening at http://localhost:${port}`);