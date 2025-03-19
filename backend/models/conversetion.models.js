const mongoose = require('mongoose');
// conversation schema
const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      message: String,
      timestamp: Date,
    },
  ],

});
module.exports = mongoose.model('Conversation', conversationSchema);
