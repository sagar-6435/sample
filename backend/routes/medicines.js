const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');
const multer = require('multer');

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Search medicines
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const medicines = await Medicine.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get medicine by ID
router.get('/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Medicine detection (mock implementation - replace with your own logic)
router.post('/detect', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Mock detection - return sample medicines from database
    const medicines = await Medicine.find().limit(3);
    
    res.json({
      success: true,
      confidence: 0.85,
      detected: medicines[0] || {
        name: 'Sample Medicine',
        category: 'General',
        description: 'Medicine detection feature - integrate your own detection logic'
      },
      suggestions: medicines,
      note: 'Mock detection - integrate your own medicine detection service'
    });
  } catch (error) {
    console.error('Detection Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Batch detection (mock implementation)
router.post('/detect-batch', upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No image files provided' });
    }

    const medicines = await Medicine.find().limit(req.files.length);
    
    const results = req.files.map((file, index) => ({
      filename: file.originalname,
      detected: medicines[index] || null,
      confidence: 0.80 + Math.random() * 0.15
    }));

    res.json({
      success: true,
      results,
      note: 'Mock batch detection - integrate your own detection service'
    });
  } catch (error) {
    console.error('Batch Detection Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Analyze dosage (mock implementation)
router.post('/analyze-dosage', async (req, res) => {
  try {
    const { medicine_id, patient_age, patient_weight } = req.body;

    // Mock dosage analysis
    res.json({
      success: true,
      medicine_id,
      recommended_dosage: '500mg twice daily',
      warnings: ['Take with food', 'Avoid alcohol'],
      patient_specific: {
        age: patient_age,
        weight: patient_weight,
        adjusted_dosage: '500mg twice daily'
      },
      note: 'Mock dosage analysis - integrate your own medical logic'
    });
  } catch (error) {
    console.error('Dosage Analysis Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get medicine suggestions
router.get('/suggestions', async (req, res) => {
  try {
    const medicines = await Medicine.find().limit(5);
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
