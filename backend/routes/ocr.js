const express = require('express');
const router = express.Router();
const multer = require('multer');

/**
 * OCR Routes
 * 
 * Handles receipt scanning and ingredient extraction using Google Vision API
 */

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// POST /api/ocr/scan-receipt - Scan receipt image
router.post('/scan-receipt', upload.single('receipt'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image file provided',
      });
    }

    // TODO: Implement Google Vision API integration
    // const vision = require('@google-cloud/vision');
    // const client = new vision.ImageAnnotatorClient();
    // const [result] = await client.textDetection(req.file.buffer);
    
    // Mock OCR response for demonstration
    const mockExtractedItems = [
      { name: 'Chicken Breast', quantity: '2 lbs', category: 'Protein' },
      { name: 'Tomatoes', quantity: '5', category: 'Vegetables' },
      { name: 'Olive Oil', quantity: '1 bottle', category: 'Oils' },
      { name: 'Pasta', quantity: '2 boxes', category: 'Carbs' },
    ];

    res.json({
      success: true,
      message: 'Receipt scanned successfully',
      data: {
        items: mockExtractedItems,
        rawText: 'Mock receipt text...',
      },
    });
  } catch (error) {
    console.error('OCR Error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST /api/ocr/extract-text - Extract text from image
router.post('/extract-text', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image file provided',
      });
    }

    // TODO: Implement Google Vision API text extraction
    
    res.json({
      success: true,
      data: {
        text: 'Mock extracted text from image',
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
