//this file controls communication with the database directly for api calls

const mongoose = require('mongoose');
const movItems = mongoose.model('MoviesEntry');
const musItems = mongoose.model('MusicEntry');
const gmsItems = mongoose.model('GamesEntry');
const bksItems = mongoose.model('BooksEntry');


//return count of documents in collection ======================================================================================
const countEntries = (req, res) =>
{
    counts = [];

    //get movies count
    movItems
        .estimatedDocumentCount()
        .exec((err, count) =>
        {
            //collection not found
            if (!count)
            {
                console.log("encountered error while retrieving the collection...");
                return res
                    .status(404)
                    .json({ "message": "There was a problem retrieving the collection!" });
            }
            //other errors
            else if (err)
            {
                console.log("encountered unknown error...");
                return res
                    .status(404)
                    .json(err);
            }
            counts[0] = count;
            res
                .status(200);
        });

    //get music count
    musItems
        .estimatedDocumentCount()
        .exec((err, count) =>
        {
            //collection not found
            if (!count)
            {
                console.log("encountered error while retrieving the collection...");
                return res
                    .status(404)
                    .json({ "message": "There was a problem retrieving the collection!" });
            }
            //other errors
            else if (err)
            {
                console.log("encountered unknown error...");
                return res
                    .status(404)
                    .json(err);
            }
            counts[1] = count;
            res
                .status(200);
        });

    //get games count
    gmsItems
        .estimatedDocumentCount()
        .exec((err, count) =>
        {
            //collection not found
            if (!count)
            {
                console.log("encountered error while retrieving the collection...");
                return res
                    .status(404)
                    .json({ "message": "There was a problem retrieving the collection!" });
            }
            //other errors
            else if (err)
            {
                console.log("encountered unknown error...");
                return res
                    .status(404)
                    .json(err);
            }
            counts[2] = count;
            res
                .status(200);
        });

    //get books count
    bksItems
        .estimatedDocumentCount()
        .exec((err, count) =>
        {
            //collection not found
            if (!count)
            {
                console.log("encountered error while retrieving the collection...");
                return res
                    .status(404)
                    .json({ "message": "There was a problem retrieving the collection!" });
            }
            //other errors
            else if (err)
            {
                console.log("encountered unknown error...");
                return res
                    .status(404)
                    .json(err);
            }
            counts[3] = count;
            res
                .status(200)
                .json(counts);
        });
};


module.exports =
{
    countEntries
}
