const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const { Readable } = require('stream');

const requireAuth = require('../../middleware/auth');
const Document = require('../../models/Document');

const router = express.Router();

const maxFileSizeInBytes = 10 * 1024 * 1024;
const bucketName = 'documents';
const allowedMimeTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
]);

const createStoredFileName = (originalName) => {
  const extensionMatch = originalName.match(/(\.[^.]*)$/);
  const extension = extensionMatch ? extensionMatch[1].toLowerCase() : '';
  const baseName = originalName
    .replace(/(\.[^.]*)$/, '')
    .trim()
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60) || 'document';

  return `${Date.now()}-${baseName}${extension}`;
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: maxFileSizeInBytes,
  },
  fileFilter: (_req, file, cb) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      cb(new Error('Only PDF, DOC, DOCX, and TXT files are allowed.'));
      return;
    }

    cb(null, true);
  },
});

router.post('/', requireAuth, (req, res) => {
  upload.single('document')(req, res, async (error) => {
    if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'Document size must be 10MB or less.',
      });
    }

    if (error) {
      return res.status(400).json({
        message: error.message || 'Invalid document upload.',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: 'Document file is required.',
      });
    }

    if (!mongoose.connection.db) {
      return res.status(500).json({
        message: 'Database connection is not ready.',
      });
    }

    const sanitizedOriginalName = req.file.originalname.trim() || 'document';
    const storedFileName = createStoredFileName(sanitizedOriginalName);
    const openUploadStream = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName });
    const uploadStream = openUploadStream.openUploadStream(storedFileName, {
      contentType: req.file.mimetype,
      metadata: {
        userId: req.user.userId,
        originalName: sanitizedOriginalName,
        fileName: storedFileName,
      },
    });

    try {
      const storageId = await new Promise((resolve, reject) => {
        Readable.from(req.file.buffer)
          .pipe(uploadStream)
          .on('error', reject)
          .on('finish', () => resolve(uploadStream.id));
      });

      const fileUrl = `${req.protocol}://${req.get('host')}/api/documents/${storageId.toString()}/download`;

      const savedDocument = await Document.create({
        user: req.user.userId,
        originalName: sanitizedOriginalName,
        fileName: storedFileName,
        storageId,
        bucketName,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: fileUrl,
      });

      return res.status(201).json({
        message: 'Document uploaded successfully.',
        document: {
          id: savedDocument._id,
          originalName: savedDocument.originalName,
          fileName: savedDocument.fileName,
          mimeType: savedDocument.mimeType,
          size: savedDocument.size,
          url: savedDocument.url,
          uploadedAt: savedDocument.createdAt,
        },
      });
    } catch (saveError) {
      if (uploadStream.id) {
        try {
          await new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName }).delete(uploadStream.id);
        } catch (cleanupError) {
          console.error('GridFS cleanup error:', cleanupError);
        }
      }

      console.error('Save document error:', saveError);
      return res.status(500).json({
        message: 'Server error, unable to save document.',
      });
    }
  });
});

module.exports = router;
