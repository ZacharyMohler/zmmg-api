//this file defines the routes for our api controllers

const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require("express-jwt");
const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'payload'
});
const ctrlMoviesEntrys = require('../controllers/moviesEntries');
const ctrlMusicEntrys = require('../controllers/musicEntries');
const ctrlGamesEntrys = require('../controllers/gamesEntries');
const ctrlBooksEntrys = require('../controllers/booksEntries');
const ctrlCountEntries = require('../controllers/countEntries');
const ctrlAuth = require('../controllers/authentication');


//movies =============================================
router
    .route('/moviesEntries')
    .get(ctrlMoviesEntrys.moviesEntriesAlphabetical)
    .post(auth, ctrlMoviesEntrys.moviesEntriesCreate);
router
    .route('/moviesEntriesSearch/:toSearch')
    .get(ctrlMoviesEntrys.moviesEntriesSearch);
router
    .route('/moviesEntries/:movieEntryId')
    .get(ctrlMoviesEntrys.moviesEntriesReadOne)
    .put(auth, ctrlMoviesEntrys.moviesEntriesUpdateOne)
    .delete(auth, ctrlMoviesEntrys.moviesEntriesDeleteOne);
router
    .route('/moviesEntriesFormat/:format')
    .get(ctrlMoviesEntrys.moviesEntriesFormat);

//music ==============================================
router
    .route('/musicEntries')
    .get(ctrlMusicEntrys.musicEntriesAlphabetical)
    .post(auth, ctrlMusicEntrys.musicEntriesCreate);
router
    .route('/musicEntriesSearch/:toSearch')
    .get(ctrlMusicEntrys.musicEntriesSearch);
router
    .route('/musicEntries/:musicEntryId')
    .get(ctrlMusicEntrys.musicEntriesReadOne)
    .put(auth, ctrlMusicEntrys.musicEntriesUpdateOne)
    .delete(auth, ctrlMusicEntrys.musicEntriesDeleteOne);
router
    .route('/musicEntriesFormat/:format')
    .get(ctrlMusicEntrys.musicEntriesFormat);

//games ===============================================
router
    .route('/gamesEntries')
    .get(ctrlGamesEntrys.gamesEntriesAlphabetical)
    .post(auth, ctrlGamesEntrys.gamesEntriesCreate);
router
    .route('/gamesEntriesSearch/:toSearch')
    .get(ctrlGamesEntrys.gamesEntriesSearch);
router
    .route('/gamesEntries/:gamesEntryId')
    .get(ctrlGamesEntrys.gamesEntriesReadOne)
    .put(auth, ctrlGamesEntrys.gamesEntriesUpdateOne)
    .delete(auth, ctrlGamesEntrys.gamesEntriesDeleteOne);
router
    .route('/gamesEntriesPlatform/:platform')
    .get(ctrlGamesEntrys.gamesEntriesPlatform);

//books ================================================
router
    .route('/booksEntries')
    .get(ctrlBooksEntrys.booksEntriesAlphabetical)
    .post(auth, ctrlBooksEntrys.booksEntriesCreate);
router
    .route('/booksEntriesSearch/:toSearch')
    .get(ctrlBooksEntrys.booksEntriesSearch);
router
    .route('/booksEntries/:booksEntryId')
    .get(ctrlBooksEntrys.booksEntriesReadOne)
    .put(auth, ctrlBooksEntrys.booksEntriesUpdateOne)
    .delete(auth, ctrlBooksEntrys.booksEntriesDeleteOne);
//year by year
router
    .route('/books/olderthan1900')
    .get(ctrlBooksEntrys.booksEntriesOlderThan1900);
router
    .route('/books/olderthan1950')
    .get(ctrlBooksEntrys.booksEntriesOlderThan1950);
router
    .route('/books/olderthan2000')
    .get(ctrlBooksEntrys.booksEntriesOlderThan2000);
router
    .route('/books/newerthan2000')
    .get(ctrlBooksEntrys.booksEntriesNewer2000);

//count entries =========================================
router
    .route('/countEntries')
    .get(ctrlCountEntries.countEntries);

//authentication ========================================
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;

