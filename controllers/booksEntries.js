//this file controls communication with the database directly for api calls

const mongoose = require('mongoose');
const bksItems = mongoose.model('BooksEntry');


//retrun all book items in alphabetical order =================================================================================
const booksEntriesAlphabetical = (req, res) => {

    //use our model (hooked up to booksentries collection in db)
    bksItems
        //return all
        .find({}).sort({ title: 1 }).collation({ locale: "en", caseLevel: true })
        .exec((err, booksEntries) => {

            //collection not found error
            if (!booksEntries) {
                console.log("encountered error while retrieving the collection... ");
                return res
                    .staus(404)
                    .json({ "message": "There was a problem retrieving the collection! Collection given: " + booksEntries });
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
                .json(booksEntries);
        });
};

//search method =================================================================================
const booksEntriesSearch = (req, res) =>
{

    //use our model (hooked up to moviesentries collection in db)
    bksItems

        //return all
        .find({ title: { $regex: new RegExp(String(req.params.toSearch), "i") } }).sort({ title: 1 }).collation({ locale: "en", caseLevel: true })
        .exec((err, booksEntries) =>
        {

            //collection not found error
            if (!booksEntries)
            {
                console.log("encountered error while retrieving the collection... ");
                return res
                    .staus(404)
                    .json({ "message": "There was a problem retrieving the collection! Collection given: " + booksEntries });
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
                .json(booksEntries);
        });
};

//retrun all book items older than 1900 =================================================================================
const booksEntriesOlderThan1900 = (req, res) =>
{

    //use our model (hooked up to booksentries collection in db)
    bksItems
        //return all
        .find({ $or: [{ year: { $lt: 1900 } }, { year: "" }]}).sort({ title: 1 }).collation({ locale: "en", caseLevel: true })
        .exec((err, booksEntries) =>
        {

            //collection not found error
            if (!booksEntries)
            {
                console.log("encountered error while retrieving the collection... ");
                return res
                    .staus(404)
                    .json({ "message": "There was a problem retrieving the collection! Collection given: " + booksEntries });
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
                .json(booksEntries);
        });
};

//retrun all book items older than 1950 =================================================================================
const booksEntriesOlderThan1950 = (req, res) =>
{

    //use our model (hooked up to booksentries collection in db)
    bksItems
        //return all
        .find({ $and: [{ year: { $gt: 1899 } }, { year: { $lt: 1950} } ] }).sort({ title: 1 }).collation({ locale: "en", caseLevel: true })
        .exec((err, booksEntries) =>
        {

            //collection not found error
            if (!booksEntries)
            {
                console.log("encountered error while retrieving the collection... ");
                return res
                    .staus(404)
                    .json({ "message": "There was a problem retrieving the collection! Collection given: " + booksEntries });
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
                .json(booksEntries);
        });
};

//retrun all book items older than 2000 =================================================================================
const booksEntriesOlderThan2000 = (req, res) =>
{

    //use our model (hooked up to booksentries collection in db)
    bksItems
        //return all
        .find({ $and: [{ year: { $gt: 1949 } }, { year: { $lt: 2000 } }] }).sort({ title: 1 }).collation({ locale: "en", caseLevel: true })
        .exec((err, booksEntries) =>
        {

            //collection not found error
            if (!booksEntries)
            {
                console.log("encountered error while retrieving the collection... ");
                return res
                    .staus(404)
                    .json({ "message": "There was a problem retrieving the collection! Collection given: " + booksEntries });
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
                .json(booksEntries);
        });
};

//retrun all book items newer than 2000 =================================================================================
const booksEntriesNewer2000 = (req, res) =>
{

    //use our model (hooked up to booksentries collection in db)
    bksItems
        //return all
        .find({year : { $gt: 1999 }} ).sort({ title: 1 }).collation({ locale: "en", caseLevel: true })
        .exec((err, booksEntries) =>
        {

            //collection not found error
            if (!booksEntries)
            {
                console.log("encountered error while retrieving the collection... ");
                return res
                    .staus(404)
                    .json({ "message": "There was a problem retrieving the collection! Collection given: " + booksEntries });
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
                .json(booksEntries);
        });
};

//add one books entry =================================================================================================================
const booksEntriesCreate = (req, res) => {

    //create new item based on the model
    bksItems.create({
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        comments: req.body.comments
    },

        (err, booksEntry) => {

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
                    .json(booksEntry);
            }
        });
};

//return one entry given its ObjectId =================================================================================================
const booksEntriesReadOne = (req, res) => {

    //use our model (hooked up to booksentries collection in db)
    bksItems
        //return one item given its ObjectId 
        .findById(req.params.booksEntryId)
        .exec((err, booksEntry) => {

            //collection error
            if (!booksEntry) {
                console.log("Encountered error while retrieving entry in books collection with id: " + req.params.booksEntryId);
                return res
                    .status(404)
                    .json({ "message": "Entry not found! check ID: " + req.params.booksEntryId });
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
                .json(booksEntry);
        });
};

//update one books entry ==============================================================================================================
const booksEntriesUpdateOne = (req, res) => {
    if (!req.params.booksEntryId) {
        console.log("Encountered error while conducting Update. No ObjectId given!");
        return res
            .status(404)
            .json({ "message": "booksEntry not found, please provide the entry's ObjectId" });
    }

    bksItems
        .findById(req.params.booksEntryId)
        .exec((err, booksEntry) => {

            //no entry with given objectId error
            if (!booksEntry) {
                console.log("Encountered error while conducting Update. No entry found with given Id. Check ObjectId: " + req.params.booksEntryId);
                return res
                    .status(404)
                    .json({ "message": "no entry found with ObjectId: " + req.params.booksEntryId });
            }
            //other errors
            else if (err) {
                console.log("Encountered unknown error during Update method...");
                return res
                    .status(404)
                    .json(err);
            }
            //otherwise, all good so make the update
            booksEntry.title = req.body.title;
            booksEntry.author = req.body.author;
            booksEntry.year = req.body.year;
            booksEntry.comments = req.body.comments;

            //try to save new data
            booksEntry.save((err, entry) => {
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

//delete one books entry ==============================================================================================================
const booksEntriesDeleteOne = (req, res) => {

    //if there is an item with that Id
    if (req.params.booksEntryId) {
        bksItems
            .findByIdAndRemove(req.params.booksEntryId)
            .exec((err, booksEntry) => {
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
        console.log("Encountered error while conducting delete. No entry found with given Id. Check ObjectId: " + req.params.booksEntryId);
        res
            .status(404)
            .json({ "message": "no item found with ObjectId: " + req.params.booksEntryId });
    }
};


module.exports =
{
    booksEntriesSearch,
    booksEntriesAlphabetical,
    booksEntriesOlderThan1900,
    booksEntriesOlderThan1950,
    booksEntriesOlderThan2000,
    booksEntriesNewer2000,
    booksEntriesCreate,
    booksEntriesReadOne,
    booksEntriesUpdateOne,
    booksEntriesDeleteOne
}
