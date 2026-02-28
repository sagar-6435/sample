const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');

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

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

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

// AI medicine detection - calls FastAPI ML service
router.post('/detect', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Create form data to send to ML service
    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });

    // Call FastAPI ML service
    const mlResponse = await axios.post(
      `${ML_SERVICE_URL}/api/detect`,
      formData,
      {
        headers: {
          ...formData.getHeaders()
        },
        timeout: 30000 // 30 second timeout
      }
    );

    res.json(mlResponse.data);
  } catch (error) {
    console.error('ML Service Error:', error.message);
    
    // Fallback to mock data if ML service is unavailable
    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      const medicines = await Medicine.find().limit(3);
      return res.json({
        success: true,
        confidence: 0.85,
        detected: medicines[0] || {},
        suggestions: medicines,
        note: 'ML service unavailable - using fallback data'
      });
    }
    
    res.status(500).json({ error: error.message });
  }
});

// Batch detection
router.post('/detect-batch', upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No image files provided' });
    }

    const formData = new FormData();
    req.files.forEach(file => {
      formData.append('files', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype
      });
    });

    const mlResponse = await axios.post(
      `${ML_SERVICE_URL}/api/detect-batch`,
      formData,
      {
        headers: {
          ...formData.getHeaders()
        },
        timeout: 60000 // 60 second timeout for batch
      }
    );

    res.json(mlResponse.data);
  } catch (error) {
    console.error('ML Service Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Analyze dosage
router.post('/analyze-dosage', async (req, res) => {
  try {
    const { medicine_id, patient_age, patient_weight } = req.body;

    const mlResponse = await axios.post(
      `${ML_SERVICE_URL}/api/analyze-dosage`,
      { medicine_id, patient_age, patient_weight },
      {
        params: { medicine_id, patient_age, patient_weight }
      }
    );

    res.json(mlResponse.data);
  } catch (error) {
    console.error('ML Service Error:', error.message);
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

// Health check for ML service
router.get('/ml-health', async (req, res) => {
  try {
    const response = await axios.get(`${ML_SERVICE_URL}/health`, { timeout: 5000 });
    res.json({
      ml_service: 'connected',
      ...response.data
    });
  } catch (error) {
    res.status(503).json({
      ml_service: 'disconnected',
      error: error.message
    });
  }
});

module.exports = router;
