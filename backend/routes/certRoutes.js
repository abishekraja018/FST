// backend/routes/certRoutes.js
const express = require('express');
const router = express.Router();

const {
  issueCertificate,
  getAllCerts,
  verifyCert
} = require('../controllers/certController');

const protect = require('../middleware/auth'); // Make sure this file exists

// Public route: verify certificate by ID
router.get('/verify/:id', verifyCert);

// Protected routes
router.get('/', protect, getAllCerts);
router.post('/issue', protect, issueCertificate);

module.exports = router;
