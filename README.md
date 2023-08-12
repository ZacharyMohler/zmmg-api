# Backend API for database management web app
code for the front end application can be found here:
https://github.com/ZacharyMohler/zmmg-angular

This API communicates with a MongoDB database, and makes use of Mongoose. 

Node: 16.20.1 
Express: 4.16.1 
MongoDB shell: 5.0.17

### config holds the passport file used for authentication. It checks username and password values passed in.

## controllers
holds the DB controllers, that is, it contains the actual methods to call that then are sent to the database, returning JSON data of the result. 
These methods control CRUD operations, and handle errors by returning and sometimes logging to the console.

## models
contains the DB models for specific collection entries ( a movie/game/book entry).
it also contains the db.js file which connects to the database using heroku environment variables, handles shutdowns/restarts, and compiles the model schemas.
also contained in models is the user.js file which handles the actual encryption of passwords as they're sent in <b><i>NEAT!</b></i>

## routes
contains routing information, so that specific /api/<path> variables call the correct methods in the corresponding controller.

## README
is the file you're reading right now... 

