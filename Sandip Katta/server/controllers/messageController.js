const Message = require('../models/Message');

// Get all messages
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};

// Post a new message
const postMessage = async (req, res) => {
  const { sender, content } = req.body;

  if (!sender || !content) {
    return res.status(400).json({ message: 'Sender and content are required' });
  }

  try {
    const newMessage = new Message({ sender, content });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save message' });
  }
};

module.exports = {
  getMessages,
  postMessage,
};
