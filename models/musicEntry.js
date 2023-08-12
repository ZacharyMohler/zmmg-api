const mongoose = require('mongoose');

const musicEntrySchema = new mongoose.Schema({

    title:
    {
        type: String,
        required: true
    },

    artist:
    {
        type: String,
        required: true
    },

    format:
    {
        type: String,
        required: true
    },

    comments:
    {
        type: String,
        'default': ''
    },

    otherIdentifier:
    {
        type: String,
        'default': ''
    }
});


mongoose.model('MusicEntry', musicEntrySchema);