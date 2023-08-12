//this file controls communication with the database directly for api calls

const mongoose = require('mongoose');
const movItems = mongoose.model('MoviesEntry');

//retrun all movie items in alphabetical order =================================================================================
const moviesEntriesAlphabetical = (req, res) => {

    //use our model (hooked up to moviesentries collection in db)
    movItems
        //return all
        .find({}).sort({ title: 1 }).collation({ locale: "en", caseLevel: true })
        .exec((err, moviesEntries) => {

            //collection not found error
            if (!moviesEntries) {
                console.log("encountered error while retrieving the collection... ");
                return res
                    .staus(404)
                    .json({ "message": "There was a problem retrieving the collection! Collection given: " + moviesEntries });
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
                .json(moviesEntries);
        });
};

//search by title =================================================================================================================
const moviesEntriesSearch = (req, res) =>
{

    //use our model (hooked up to moviesentries collection in db)
    movItems

        //return all
        .find({ title: { $regex: new RegExp(String(req.params.toSearch), "i") } } ).sort({ title: 1 }).collation({ locale: "en", caseLevel: true })
        .exec((err, moviesEntries) =>
        {

            //collection not found error
            if (!moviesEntries)
            {
                console.log("encountered error while retrieving the collection... ");
                return res
                    .staus(404)
                    .json({ "message": "There was a problem retrieving the collection! Collection given: " + moviesEntries });
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
                .json(moviesEntries);
        });
};

//retrun movie items for a specific format in alphabetical order =================================================================================
const moviesEntriesFormat = (req, res) =>
{

    //use our model (hooked up to moviesentries collection in db)
    movItems
        //return all
        .find({ format: String(req.params.format) }).sort({ title: 1 }).collation({ locale: "en", caseLevel: true })
        .exec((err, moviesEntries) =>
        {

            //collection not found error
            if (!moviesEntries)
            {
                console.log("encountered error while retrieving the collection... ");
                return res
                    .staus(404)
                    .json({ "message": "There was a problem retrieving the collection! Collection given: " + moviesEntries });
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
                .json(moviesEntries);
        });
};

//add one movie entry (API ONLY)================================================================================================================================
const moviesEntriesCreate = (req, res) => {

    //create new item based on the model
    movItems.create({
        title: req.body.title,
        format: req.body.format,
        type: req.body.type,
        comments: req.body.comments
    },
      
        (err, movieEntry) => {

        //if theres an error while creating
        if (err) 
        {
            console.log("Encountered unknown error during Create method...");
            res
                .status(400)
                .json(err);
        }
        //otherwise all is good
        else
        {
            res
                .status(201) //creation success code
                .json(movieEntry);
        }
    });
};

//return one entry given its ObjectId (API ONLY)=================================================================================================
const moviesEntriesReadOne = (req, res) => {

    //use our model (hooked up to moviesentries collection in db)
    movItems
        //return one item given its ObjectId 
        .findById(req.params.movieEntryId)
        .exec((err, moviesEntry) => {

            //collection error
            if (!moviesEntry)
            {
                console.log("Encountered error while retrieving entry in movies collection with id: " + req.params.movieEntryId);
                return res
                    .status(404)
                    .json({ "message": "Entry not found! check ID: " + req.params.movieEntryId});
            }
            //other errors
            else if (err)
            {
                console.log("Encountered unknown error during ReadOne method...");
                return res
                    .status(404)
                    .json(err);
            }
            //all good so return item
            res
                .status(200)
                .json(moviesEntry);
        });
};

//update one movie entry (API ONLY) ===============================================================================================================
const moviesEntriesUpdateOne = (req, res) => {
    if (!req.params.movieEntryId)
    {
        console.log("Encountered error while conducting Update. No ObjectId given!");
        return res
            .status(404)
            .json({ "message": "moviesEntry not found, please provide the entry's ObjectId" });
    }

    movItems
        .findById(req.params.movieEntryId)
        .exec((err, movieEntry) => {

            //no entry with given objectId error
            if (!movieEntry)
            {
                console.log("Encountered error while conducting Update. No entry found with given Id. Check ObjectId: " + req.params.movieEntryId);
                return res
                    .status(404)
                    .json({ "message": "no entry found with ObjectId: " + req.params.movieEntryId });
            }
            //other errors
            else if (err)
            {
                console.log("Encountered unknown error during Update method...");
                return res
                    .status(404)
                    .json(err);
            }
            //otherwise, all good so make the update
            movieEntry.title = req.body.title;
            movieEntry.format = req.body.format;
            movieEntry.type = req.body.type;
            movieEntry.comments = req.body.comments;

            //try to save new data
            movieEntry.save((err, entry) => {
                if (err)
                {
                    console.log("Encountered unknown error during Update method...");
                    res
                        .status(404)
                        .json(err);
                }
                else
                {
                    res
                        .status(200)
                        .json(entry);
                }
            });
        });
};

//delete one movie entry (API ONLY) =================================================================================================================
const moviesEntriesDeleteOne = (req, res) => {

    //if there is an item with that Id
    if (req.params.movieEntryId)
    {
        movItems
            .findByIdAndRemove(req.params.movieEntryId)
            .exec((err, movieEntry) => {
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
    else
    {
        console.log("Encountered error while conducting delete. No entry found with given Id. Check ObjectId: " + req.params.movieEntryId);
        res
            .status(404)
            .json({ "message": "no item found with ObjectId: " + req.params.movieEntryId });
    }
};

module.exports =
{
    moviesEntriesAlphabetical,
    moviesEntriesFormat,
    moviesEntriesSearch,
    moviesEntriesCreate,
    moviesEntriesReadOne,
    moviesEntriesUpdateOne,
    moviesEntriesDeleteOne
}
