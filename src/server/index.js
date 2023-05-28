//Include api modules.
const http = require('http');
const express = require('express');

//Define routes and events
const { bind } = require('./routes');
const events = require('./events.js');
const { errorHandler } = require('./middleware.js');


//Start Express-js.
const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: '7mb', type: ['application/json', 'text/plain'] }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Allow', 'GET, POST');
    next();
});

//Bind error handler middleware.
app.use(errorHandler);


//Bind the app with routes.
bind(app);

//Bind error handler middleware.
app.use(errorHandler);

//Define server "special" event to handle situations.
server.on('error', events.onServerError);
process.on('SIGINT', () => events.onProcessKill(server));
process.on('SIGTERM', () => events.onProcessKill(server));
process.on('unhandledRejection', events.onException);
process.on('uncaughtException', (err) => events.onException(err));

//Start listen mode.
app.listen(3000, () => events.onListen(3000));