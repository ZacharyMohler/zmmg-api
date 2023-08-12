//this file controls communication with the database directly for api calls

const mongoose = require('mongoose');
const musItems = mongoose.model('MusicEntry');


//return all music items in alphabetical order =================================================================================
const musicEntriesAlphabetical = (req, res) => {

    //use our model (hooked up to musicentries collection in db)
    musItems
        //return all
        .find({}).sort({ title: 1 }).collation({ locale: "en", caseLevel: true })
        .exec((err, musicEntries) => {

            //collection not found error
            if (!musicEntries) {
                console.log("encountered error while retrieving the collection... ");
                return res
                    .staus(404)
                    .json({ "message": "There was a problem retrieving the collection! Collection given: " + musicEntries });
            }
            //other errors
            else if (err) {
                console.log("encountered unknown error...");
                return res
                    .status(404)
                    .json(err);
            }

            //no problems, so return list
            res
                .status(200)
                .json(musicEntries);
        });
};

//search method ===================================================================================================================
const musicEntriesSearch = (req, res) =>
{

    //use our model (hooked up to moviesentries collection in db)
    musItems

        //return all
        .find({ title: { $regex: new RegExp(String(req.params.toSearch), "i") } }).sort({ title: 1 }).collation({ locale: "en", caseLevel: true })
        .exec((err, musicEntries) =>
        {

            //collection not found error
            if (!musicEntries)
            {
                console.log("encountered error while retrieving the collection... ");
                return res
                    .staus(404)
                    .json({ "message": "There was a problem retrieving the collection! Collection given: " + musicEntries });
            }
            //other errors
            else if (err)
            {
                console.log("encountered unknown error...");
                return res
                    .status(404)
                    .json(err);
            }

            //no problems, so return list
            res
                .status(200)
                .json(musicEntries);
        });
};

//return music items given a format ==================================================================================================
const musicEntriesFormat = (req, res) =>
{

    //use our model (hooked up to musicentries collection in db)
    musItems
        
        .find({ format: String(req.params.format) }).sort({ title: 1 }).collation({ locale: "en", caseLevel: true })
        .exec((err, musicEntries) =>
        {

            //collection not found error
            if (!musicEntries)
            {
                console.log("encountered error while retrieving the collection... ");
                return res
                    .staus(404)
                    .json({ "message": "There was a problem retrieving the collection! Collection given: " + musicEntries });
            }
            //other errors
            else if (err)
            {
                console.log("encountered unknown error...");
                return res
                    .status(404)
                    .json(err);
            }

            //no problems, so return list
            res
                .status(200)
                .json(musicEntries);
        });
};

//add one music entry (API ONLY) ==========================================================================================================
const musicEntriesCreate = (req, res) => {

    //create new item based on the model
    musItems.create({
        title: req.body.title,
        artist: req.body.artist,
        format: req.body.format,
        comments: req.body.comments,
        otherIdentifier: req.body.otherIdentifier
    },

        (err, musicEntry) => {

            //if theres an error while creating
            if (err) {
                console.log("Encountered unknown error during Create method...");
                res
                    .status(400)
                    .json(err);
            }
            //otherwise all is good
            else {
                res
                    .status(201) //creation success code
                    .json(musicEntry);
            }
        });
};

//return one entry given its ObjectId (API ONLY) =================================================================================================
const musicEntriesReadOne = (req, res) => {

    //use our model (hooked up to musicentries collection in db)
    musItems
        //return one item given its ObjectId 
        .findById(req.params.musicEntryId)
        .exec((err, musicEntry) => {

            //collection error
            if (!musicEntry) {
                console.log("Encountered error while retrieving entry in music collection with id: " + req.params.musicEntryId);
                return res
                    .status(404)
                    .json({ "message": "Entry not found! check ID: " + req.params.musicEntryId });
            }
            //other errors
            else if (err) {
                console.log("Encountered unknown error during ReadOne method...");
                return res
                    .status(404)
                    .json(err);
            }
            //all good so return item
            res
                .status(200)
                .json(musicEntry);
        });
};

//update one music entry (API ONLY) ==============================================================================================================
const musicEntriesUpdateOne = (req, res) => {
    if (!req.params.musicEntryId) {
        console.log("Encountered error while conducting Update. No ObjectId given!");
        return res
            .status(404)
            .json({ "message": "musicEntry not found, please provide the entry's ObjectId" });
    }

    musItems
        .findById(req.params.musicEntryId)
        .exec((err, musicEntry) => {

            //no entry with given objectId error
            if (!musicEntry) {
                console.log("Encountered error while conducting Update. No entry found with given Id. Check ObjectId: " + req.params.musicEntryId);
                return res
                    .status(404)
                    .json({ "message": "no entry found with ObjectId: " + req.params.musicEntryId });
            }
            //other errors
            else if (err) {
                console.log("Encountered unknown error during Update method...");
                return res
                    .status(404)
                    .json(err);
            }
            //otherwise, all good so make the update
            musicEntry.title = req.body.title;
            musicEntry.artist = req.body.artist;
            musicEntry.format = req.body.format;
            musicEntry.comments = req.body.comments;
            musicEntry.otherIdentifier = req.body.otherIdentifier;

            //try to save new data
            musicEntry.save((err, entry) => {
                if (err) {
                    console.log("Encountered unknown error during Update method...");
                    res
                        .status(404)
                        .json(err);
                }
                else {
                    res
                        .status(200)
                        .json(entry);
                }
            });
        });
};

//delete one music entry (API ONLY) ==============================================================================================================
const musicEntriesDeleteOne = (req, res) => {

    //if there is an item with that Id
    if (req.params.musicEntryId) {
        musItems
            .findByIdAndRemove(req.params.musicEntryId)
            .exec((err, musicEntry) => {
                //error check
                if (err) {
                    console.log("Encountered unknown error during Delete method...");
                    return res
                        .status(404)
                        .json(err);
                }
                res
                    .status(204)
                    .json(null);
            });
    }
    //there is no entry with that Id
    else {
        console.log("Encountered error while conducting delete. No entry found with given Id. Check ObjectId: " + req.params.musicEntryId);
        res
            .status(404)
            .json({ "message": "no item found with ObjectId: " + req.params.musicEntryId });
    }
};


module.exports =
{
    musicEntriesAlphabetical,
    musicEntriesSearch,
    musicEntriesFormat,
    musicEntriesCreate,
    musicEntriesReadOne,
    musicEntriesUpdateOne,
    musicEntriesDeleteOne
}
