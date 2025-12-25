// const Performance = require('../models/Performance');

// // Get all performance reviews
// const getPerformanceReviews = async (req, res) => {
//   try {
//     const reviews = await Performance.find()
//       .populate('employeeId', 'name role department')
//       .sort({ createdAt: -1 });
//     res.json(reviews);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get performance review by ID
// const getPerformanceById = async (req, res) => {
//   try {
//     const review = await Performance.findById(req.params.id)
//       .populate('employeeId', 'name role department');
//     if (!review) {
//       return res.status(404).json({ error: 'Performance review not found' });
//     }
//     res.json(review);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Create performance review
// const createPerformanceReview = async (req, res) => {
//   try {
//     // Generate review ID
//     const count = await Performance.countDocuments();
//     const reviewId = `REV-${String(count + 1).padStart(3, '0')}`;
    
//     const review = new Performance({
//       ...req.body,
//       reviewId
//     });
    
//     const savedReview = await review.save();
//     res.status(201).json(savedReview);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Update performance review
// const updatePerformanceReview = async (req, res) => {
//   try {
//     const review = await Performance.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     ).populate('employeeId', 'name role department');
    
//     if (!review) {
//       return res.status(404).json({ error: 'Performance review not found' });
//     }
    
//     res.json(review);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Delete performance review
// const deletePerformanceReview = async (req, res) => {
//   try {
//     const review = await Performance.findByIdAndDelete(req.params.id);
//     if (!review) {
//       return res.status(404).json({ error: 'Performance review not found' });
//     }
//     res.json({ message: 'Performance review deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get performance statistics
// const getPerformanceStats = async (req, res) => {
//   try {
//     const totalReviews = await Performance.countDocuments();
//     const completed = await Performance.countDocuments({ status: 'Completed' });
//     const pending = await Performance.countDocuments({ status: 'Pending' });
//     const inProgress = await Performance.countDocuments({ status: 'In Progress' });
//     const overdue = await Performance.countDocuments({ status: 'Overdue' });
    
//     // Average rating
//     const avgRatingResult = await Performance.aggregate([
//       { $match: { status: 'Completed' } },
//       { $group: { _id: null, avgRating: { $avg: '$rating' } } }
//     ]);
//     const avgScore = avgRatingResult[0]?.avgRating || 0;
    
//     // Top performers (rating >= 4.5)
//     const topPerformers = await Performance.countDocuments({ 
//       rating: { $gte: 4.5 },
//       status: 'Completed'
//     });
    
//     // Rating distribution
//     const ratingDistribution = await Performance.aggregate([
//       { $match: { status: 'Completed' } },
//       {
//         $bucket: {
//           groupBy: '$rating',
//           boundaries: [0, 1, 2, 3, 4, 5, 6],
//           default: 'Other',
//           output: { count: { $sum: 1 } }
//         }
//       }
//     ]);
    
//     res.json({
//       totalReviews,
//       completed,
//       pending,
//       inProgress,
//       overdue,
//       avgScore: parseFloat(avgScore.toFixed(1)),
//       topPerformers,
//       ratingDistribution
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Submit performance review
// const submitPerformanceReview = async (req, res) => {
//   try {
//     const review = await Performance.findByIdAndUpdate(
//       req.params.id,
//       { 
//         status: 'Completed',
//         reviewDate: new Date()
//       },
//       { new: true, runValidators: true }
//     );
    
//     if (!review) {
//       return res.status(404).json({ error: 'Performance review not found' });
//     }
    
//     res.json(review);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Add employee feedback
// const addEmployeeFeedback = async (req, res) => {
//   try {
//     const { employeeFeedback } = req.body;
    
//     const review = await Performance.findByIdAndUpdate(
//       req.params.id,
//       { employeeFeedback },
//       { new: true, runValidators: true }
//     );
    
//     if (!review) {
//       return res.status(404).json({ error: 'Performance review not found' });
//     }
    
//     res.json(review);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// module.exports = {
//   getPerformanceReviews,
//   getPerformanceById,
//   createPerformanceReview,
//   updatePerformanceReview,
//   deletePerformanceReview,
//   getPerformanceStats,
//   submitPerformanceReview,
//   addEmployeeFeedback
// };



const Performance = require("../models/Performance");

exports.getReviews = async (req, res) => {
  const reviews = await Performance.find().sort({ createdAt: -1 });
  res.json(reviews);
};

exports.createReview = async (req, res) => {
  const review = new Performance(req.body);
  const saved = await review.save();
  res.status(201).json(saved);
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Performance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.patchReview = async (req, res) => {
  try {
    const review = await Performance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePerformanceReview = async (req, res) => {
  try {
    const review = await Performance.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ message: 'Performance review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
