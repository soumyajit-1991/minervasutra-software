const Compliance = require('../models/Compliance');

// Get all compliance requirements
const getCompliance = async (req, res) => {
  try {
    const compliance = await Compliance.find().sort({ nextDueDate: 1 });
    res.json(compliance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get compliance by ID
const getComplianceById = async (req, res) => {
  try {
    const compliance = await Compliance.findById(req.params.id);
    if (!compliance) {
      return res.status(404).json({ error: 'Compliance requirement not found' });
    }
    res.json(compliance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new compliance requirement
const createCompliance = async (req, res) => {
  try {
    // Generate compliance ID
    const count = await Compliance.countDocuments();
    const complianceId = `COMP-${String(count + 1).padStart(3, '0')}`;
    
    const compliance = new Compliance({
      ...req.body,
      complianceId
    });
    
    const savedCompliance = await compliance.save();
    res.status(201).json(savedCompliance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update compliance requirement
const updateCompliance = async (req, res) => {
  try {
    const compliance = await Compliance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!compliance) {
      return res.status(404).json({ error: 'Compliance requirement not found' });
    }
    
    res.json(compliance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete compliance requirement
const deleteCompliance = async (req, res) => {
  try {
    const compliance = await Compliance.findByIdAndDelete(req.params.id);
    if (!compliance) {
      return res.status(404).json({ error: 'Compliance requirement not found' });
    }
    res.json({ message: 'Compliance requirement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get compliance statistics
const getComplianceStats = async (req, res) => {
  try {
    const totalRequirements = await Compliance.countDocuments();
    const compliant = await Compliance.countDocuments({ status: 'Compliant' });
    const pending = await Compliance.countDocuments({ status: 'Pending' });
    const nonCompliant = await Compliance.countDocuments({ status: 'Non-Compliant' });
    const underReview = await Compliance.countDocuments({ status: 'Under Review' });
    
    // Upcoming due dates (next 30 days)
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    const upcomingDue = await Compliance.countDocuments({
      nextDueDate: { $lte: thirtyDaysFromNow, $gte: new Date() },
      status: { $ne: 'Compliant' }
    });
    
    // Overdue items
    const overdue = await Compliance.countDocuments({
      nextDueDate: { $lt: new Date() },
      status: { $ne: 'Compliant' }
    });
    
    // Category breakdown
    const categoryStats = await Compliance.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Priority breakdown
    const priorityStats = await Compliance.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Next audit date (earliest upcoming audit)
    const nextAudit = await Compliance.findOne(
      { nextDueDate: { $gte: new Date() } },
      { nextDueDate: 1 }
    ).sort({ nextDueDate: 1 });
    
    res.json({
      totalRequirements,
      compliant,
      pending,
      nonCompliant,
      underReview,
      upcomingDue,
      overdue,
      categoryStats,
      priorityStats,
      nextAudit: nextAudit?.nextDueDate || null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update compliance status
const updateComplianceStatus = async (req, res) => {
  try {
    const { status, complianceRate, notes } = req.body;
    
    const updateData = { status };
    if (complianceRate !== undefined) updateData.complianceRate = complianceRate;
    if (notes) updateData.notes = notes;
    
    const compliance = await Compliance.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!compliance) {
      return res.status(404).json({ error: 'Compliance requirement not found' });
    }
    
    res.json(compliance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add audit record
const addAuditRecord = async (req, res) => {
  try {
    const { auditor, result, findings, recommendations } = req.body;
    
    const compliance = await Compliance.findById(req.params.id);
    if (!compliance) {
      return res.status(404).json({ error: 'Compliance requirement not found' });
    }
    
    compliance.auditHistory.push({
      auditor,
      result,
      findings,
      recommendations
    });
    
    // Update last audit date and status based on result
    compliance.lastAuditDate = new Date();
    if (result === 'Pass') {
      compliance.status = 'Compliant';
      compliance.complianceRate = 100;
    } else if (result === 'Fail') {
      compliance.status = 'Non-Compliant';
      compliance.complianceRate = 0;
    } else if (result === 'Conditional Pass') {
      compliance.status = 'Under Review';
      compliance.complianceRate = 75;
    }
    
    await compliance.save();
    res.json(compliance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add document
const addDocument = async (req, res) => {
  try {
    const { name, url, expiryDate } = req.body;
    
    const compliance = await Compliance.findById(req.params.id);
    if (!compliance) {
      return res.status(404).json({ error: 'Compliance requirement not found' });
    }
    
    compliance.documents.push({
      name,
      url,
      expiryDate: expiryDate ? new Date(expiryDate) : undefined
    });
    
    await compliance.save();
    res.json(compliance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Set reminder
const setReminder = async (req, res) => {
  try {
    const { type, scheduledDate } = req.body;
    
    const compliance = await Compliance.findById(req.params.id);
    if (!compliance) {
      return res.status(404).json({ error: 'Compliance requirement not found' });
    }
    
    compliance.reminders.push({
      type,
      scheduledDate: new Date(scheduledDate)
    });
    
    await compliance.save();
    res.json(compliance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
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
};