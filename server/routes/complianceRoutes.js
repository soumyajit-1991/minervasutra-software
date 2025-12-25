const express = require('express');
const router = express.Router();
const {
  getCompliance,
  getComplianceById,
  createCompliance,
  updateCompliance,
  deleteCompliance,
  getComplianceStats,
  updateComplianceStatus,
  addAuditRecord,
  addDocument,
  setReminder
} = require('../controllers/complianceController');

// GET /api/compliance - Get all compliance requirements
router.get('/', getCompliance);

// GET /api/compliance/stats - Get compliance statistics
router.get('/stats', getComplianceStats);

// GET /api/compliance/:id - Get compliance by ID
router.get('/:id', getComplianceById);

// POST /api/compliance - Create compliance requirement
router.post('/', createCompliance);

// PUT /api/compliance/:id - Update compliance requirement
router.put('/:id', updateCompliance);

// PUT /api/compliance/:id/status - Update compliance status
router.put('/:id/status', updateComplianceStatus);

// POST /api/compliance/:id/audit - Add audit record
router.post('/:id/audit', addAuditRecord);

// POST /api/compliance/:id/document - Add document
router.post('/:id/document', addDocument);

// POST /api/compliance/:id/reminder - Set reminder
router.post('/:id/reminder', setReminder);

// DELETE /api/compliance/:id - Delete compliance requirement
router.delete('/:id', deleteCompliance);

module.exports = router;