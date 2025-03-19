// sendmessage controller
const Conversation = require("../models/conversetion.models");
const Message = require("../models/message.models");

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id, receivedId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receivedId],
      },
    });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const newMessage = new Message({
      senderId: senderId,
      receiverId: receivedId,
      message: message,
    });
    // if the message
    if (newMessage) {
      await newMessage.save();
      const updatedConversation = await Conversation.findByIdAndUpdate(
        conversation._id,
        {
          $push: { messages: newMessage._id },
        },
        { new: true }
      ).populate("messages senderId receiverId");
      res.json(updatedConversation);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getMessages = async (req, res) => {
  try {
    const { id, receivedId } = req.params;
    const conversation = await Conversation.findOne({
      participants: {
        $all: [req.user._id, receivedId],
      },
    }).populate("messages senderId receiverId");
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    res.json(conversation.messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
