const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
      interviewId: {
            type: String,
            required: true,
            unique: true
      },
      candidateName: {
            type: String,
            required: true,
            trim: true
      },
      candidateAvatar: {
            type: String,
            default: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
      },
      position: {
            type: String,
            required: true,
            trim: true
      },
      interviewType: {
            type: String,
            required: true,
            enum: ['Phone Screening', 'Technical Assessment', 'First Round', 'Final Interview', 'HR Round']
      },
      interviewer: {
            type: String,
            required: true,
            trim: true
      },
      interviewerAvatar: {
            type: String,
            default: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
      },
      date: {
            type: String, // Storing as YYYY-MM-DD string for simplicity
            required: true
      },
      time: {
            type: String,
            required: true
      },
      duration: {
            type: String,
            default: '45 min'
      },
      mode: {
            type: String,
            required: true,
            enum: ['Virtual', 'Phone', 'In-person']
      },
      location: {
            type: String,
            required: true, // URL for virtual, Room/Address for In-person
            trim: true
      },
      notes: {
            type: String,
            trim: true
      },
      status: {
            type: String,
            default: 'Scheduled',
            enum: ['Scheduled', 'Completed', 'Cancelled']
      },
      createdAt: {
            type: Date,
            default: Date.now
      },
      updatedAt: {
            type: Date,
            default: Date.now
      }
});

InterviewSchema.pre('save', function (next) {
      this.updatedAt = Date.now();
      next();
});

module.exports = mongoose.model('Interview', InterviewSchema);
