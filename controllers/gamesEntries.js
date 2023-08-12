//this file controls communication with the database directly for api calls

const mongoose = require('mongoose');
const gmsItems = mongoose.model('GamesEntry');


//retrun all game items in alphabetical order =================================================================================
const gamesEntriesAlphabetical = (req, res) => {

    //use our model (hooked up to gamesentries collection in db)
    gmsItems
        //return all
        .find({}).sort({ title: 1 }).collation({ locale: "en", caseLevel: true })
        .exec((err, gamesEntries) => {

            //collection not found error
            if (!gamesEntries) {
                console.log("encountered error while retrieving the collection... ");
                return res
                    .staus(404)
                    .json({ "message": "There was a problem retrieving the collection! Collection given: " + gamesEntries });
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
                .json(gamesEntries);
        });
};

//search method =================================================================================
const gamesEntriesSearch = (req, res) =>
{

    //use our model (hooked up to moviesentries collection in db)
    gmsItems

        //return all
        .find({ title: { $regex: new RegExp(String(req.params.toSearch), "i") } }).sort({ title: 1 }).collation({ locale: "en", caseLevel: true })
        .exec((err, gamesEntries) =>
        {

            //collection not found error
            if (!gamesEntries)
            {
                console.log("encountered error while retrieving the collection... ");
                return res
                    .staus(404)
                    .json({ "message": "There was a problem retrieving the collection! Collection given: " + gamesEntries });
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
                .json(gamesEntries);
        });
};

// format specific method =================================================================================
const gamesEntriesPlatform = (req, res) =>
{

    //use our model (hooked up to gamesentries collection in db)
    gmsItems

        .find({ platform: String(req.params.platform) }).sort({ title: 1 }).collation({ locale: "en", caseLevel: true })
        .exec((err, gamesEntries) =>
        {

            //collection not found error
            if (!gamesEntries)
            {
                console.log("encountered error while retrieving the collection... ");
                return res
                    .staus(404)
                    .json({ "message": "There was a problem retrieving the collection! Collection given: " + gamesEntries });
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
                .json(gamesEntries);
        });
};

//add one games entry (API ONLY ) =================================================================================================================
const gamesEntriesCreate = (req, res) => {

    //create new item based on the model
    gmsItems.create({
        title: req.body.title,
        platform: req.body.platform,
        comments: req.body.comments
    },

        (err, gamesEntry) => {

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
                    .json(gamesEntry);
            }
        });
};

//return one entry given its ObjectId (API ONLY) =================================================================================================
const gamesEntriesReadOne = (req, res) => {

    //use our model (hooked up to gamesentries collection in db)
    gmsItems
        //return one item given its ObjectId 
        .findById(req.params.gamesEntryId)
        .exec((err, gamesEntry) => {

            //collection error
            if (!gamesEntry) {
                console.log("Encountered error while retrieving entry in games collection with id: " + req.params.gamesEntryId);
                return res
                    .status(404)
                    .json({ "message": "Entry not found! check ID: " + req.params.gamesEntryId });
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
                .json(gamesEntry);
        });
};

//update one games entry (API ONLY) ==============================================================================================================
const gamesEntriesUpdateOne = (req, res) => {
    if (!req.params.gamesEntryId) {
        console.log("Encountered error while conducting Update. No ObjectId given!");
        return res
            .status(404)
            .json({ "message": "gamesEntry not found, please provide the entry's ObjectId" });
    }

    gmsItems
        .findById(req.params.gamesEntryId)
        .exec((err, gamesEntry) => {

            //no entry with given objectId error
            if (!gamesEntry) {
                console.log("Encountered error while conducting Update. No entry found with given Id. Check ObjectId: " + req.params.gamesEntryId);
                return res
                    .status(404)
                    .json({ "message": "no entry found with ObjectId: " + req.params.gamesEntryId });
            }
            //other errors
            else if (err) {
                console.log("Encountered unknown error during Update method...");
                return res
                    .status(404)
                    .json(err);
            }
            //otherwise, all good so make the update
            gamesEntry.title = req.body.title;
            gamesEntry.platform = req.body.platform;
            gamesEntry.comments = req.body.comments;

            //try to save new data
            gamesEntry.save((err, entry) => {
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

//delete one games entry (API ONLY) ==============================================================================================================
const gamesEntriesDeleteOne = (req, res) => {

    //if there is an item with that Id
    if (req.params.gamesEntryId) {
        gmsItems
            .findByIdAndRemove(req.params.gamesEntryId)
            .exec((err, gamesEntry) => {
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
        console.log("Encountered error while conducting delete. No entry found with given Id. Check ObjectId: " + req.params.gamesEntryId);
        res
            .status(404)
            .json({ "message": "no item found with ObjectId: " + req.params.gamesEntryId });
    }
};


module.exports =
{
    gamesEntriesSearch,
    gamesEntriesAlphabetical,
    gamesEntriesPlatform,
    gamesEntriesCreate,
    gamesEntriesReadOne,
    gamesEntriesUpdateOne,
    gamesEntriesDeleteOne
}
