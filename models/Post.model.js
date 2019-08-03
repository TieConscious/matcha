const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    created: {type: Date, default: Date.now},
    media: {type: String},
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
})

module.exports = mongoose.model('Post', PostSchema);
