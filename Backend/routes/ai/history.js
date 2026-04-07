const express = require('express');
const mongoose = require('mongoose');

const requireAuth = require('../../middleware/auth');
const { getDocumentChatHistory, DocumentQaError } = require('../../services/ai/documentQaService');

const router = express.Router();

router.get('/:documentId', requireAuth, async (req, res) => {
  try {
    const { documentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(documentId)) {
      return res.status(400).json({ message: 'A valid documentId is required.' });
    }

    const history = await getDocumentChatHistory({
      documentId,
      userId: req.user.userId,
    });

    return res.status(200).json(history);
  } catch (error) {
    if (error instanceof DocumentQaError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.error('Fetch chat history error:', error);
    return res.status(500).json({
      message: error.message || 'Server error, unable to load chat history.',
    });
  }
});

module.exports = router;
