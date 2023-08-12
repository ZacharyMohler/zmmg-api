const mongoose = require('mongoose');

const gamesEntrySchema = new mongoose.Schema({

    title:
    {
        type: String,
        required: true
    },

    platform:
    {
        type: String,
        required: true
    },

    comments:
    {
        type: String,
        'default': ''
    }
});


mongoose.model('GamesEntry', gamesEntrySchema);