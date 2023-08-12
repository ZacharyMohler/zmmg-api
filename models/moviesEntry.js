//this file defines the schema for a movie item in our database
//title and format are required due to their importance

const mongoose = require('mongoose');

const moviesEntrySchema = new mongoose.Schema({


    title:
    {
        type: String,
        required: true
    },

    format:
    {
        type: String,
        required: true
    },

    type:
    {
        type: String,
        'default': ''
    },

    comments:
    {
        type: String,
        'default': ''
    }
});


mongoose.model('MoviesEntry', moviesEntrySchema);