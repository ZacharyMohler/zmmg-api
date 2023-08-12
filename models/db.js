const mongoose = require('mongoose');

//fall back on local db, but pull cloud connection from heroku environment variables
const host = '127.0.0.1:27017'
let dbURI = `mongodb://${host}/ZMMG`;

if (process.env.NODE_ENV === 'production')
{
    dbURI = process.env.MONGODB_URI;
}


//call the connection
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });


//listeners to log our connection, errors, and DCs 
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});


//handle shutdowns
const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
};


//listeners for db disconnections, restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2'); 
    });
});

process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

process.once('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

//import schemas
require('./moviesEntry');
require('./musicEntry');
require('./gamesEntry');
require('./booksEntry');
require('./users');
