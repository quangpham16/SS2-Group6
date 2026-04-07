const express = require('express');

const requireAuth = require('../../middleware/auth');
const { askDocumentQuestion, DocumentQaError } = require('../../services/ai/documentQaService');

const router = express.Router();

router.post('/', requireAuth, async (req, res) => {
  try {
    const { documentId, question } = req.body || {};

    if (!documentId || !question) {
      return res.status(400).json({ message: 'Please provide questions!' });
    }

    const answer = await askDocumentQuestion({
      documentId,
      question,
      userId: req.user.userId,
    });

    return res.status(200).json(answer);
  } catch (error) {
    if (error instanceof DocumentQaError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.error('Ask AI error:', error);
    return res.status(500).json({
      message: error.message || 'Server error, unable to answer this question.',
    });
  }
});

module.exports = router;
