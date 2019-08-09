const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Crate Schema
const UserSchema = new Schema({
	created: {
        type: Date,
        default: Date.now
    },
    // username: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     unique: true,
    //     minlength: 6,
    //     maxlength: 16,
    //     match: /^[a-z0-9-_]+$/
    // },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        //required: true
    },
    email: {
        type: String,
        required: true,
        match:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    location: {
        type: String
    },
    password: {
        type: String,
        required: true,
        match: /^(?=.*\d).{4,8}/
    },
    images: [{type: Schema.ObjectId, ref: 'Post', default: '[]'}],
    isValidated: {
        type: Boolean,
        default: false
    },
    receiveEmails: {
        type: Boolean,
        default: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "undefined"]
    },
    sexualPreference: {
        type: String,
        enum: ["male", "female", "undefined"],
        default: "undefined"
    },
    bio: {
        type: String,
        //minlength: 10,
        maxlength: 420,
        default: "Im lonely"
    },
    baldTags: [{ type: String, default: '[]'}]
});

module.exports = mongoose.model('User', UserSchema)
