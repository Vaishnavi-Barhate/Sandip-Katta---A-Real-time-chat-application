const express = require('express');
const router = express.Router();
const { getMessages, postMessage } = require('../controllers/messageController');

// GET all messages
router.get('/', getMessages);

// POST a new message
router.post('/', postMessage);

module.exports = router;
