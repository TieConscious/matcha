const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PostSchema = new Schema({
    created: {type: Date, default: Date.now},
    media: {type: String},
    userId: {type: mongoose.Types.ObjectId, ref: "User", required: true},
})

module.exports = mongoose.model('Post', PostSchema);