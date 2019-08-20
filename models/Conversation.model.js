const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  created: { type: Date, default: Date.now },
  participants: [{type: Schema.Types.ObjectId, ref: "User"}],
  messages: [
    {
      sender: { type: Schema.Types.ObjectId, ref: "User" },
      date: { type: Date, default: Date.now },
      message: String
    }
  ]
});

module.exports = mongoose.model('Conversation', ConversationSchema);
