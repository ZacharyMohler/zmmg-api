const mongoose = require('mongoose');
const crypto = require('crypto'); //You'll stay plastered
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    email:
    {
        type: String,
        unique: true,
        required: true
    },
    hash: String,
    salt: String
})

//save the ENCRYPTED password
userSchema.methods.setPassword = function (password)
{
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
};

//encrypt the password attempt and check if it's equal to the stored encrypted password
userSchema.methods.validPassword = function (password)
{
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
    return this.hash === hash;
}

//generate jwt value
userSchema.methods.generateJwt = function ()
{
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7); //7 days from creation
    return jwt.sign({
        _id: this._id,
        email: this.email,
        exp: parseInt(expiry.getTime() / 1000, 10),
    }, process.env.JWT_SECRET);
}

mongoose.model('User', userSchema);