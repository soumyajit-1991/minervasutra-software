const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

// Get all attendance records
const getAttendance = async (req, res) => {
  try {
    const { date, employeeId, department } = req.query;
    let filter = {};
    
    if (date) filter.date = new Date(date);
    if (employeeId) filter.employeeId = employeeId;
    if (department) filter.department = department;
    
    const attendance = await Attendance.find(filter)
      .populate('employeeId', 'name role department')
      .sort({ date: -1 });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create attendance record
const createAttendance = async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    const savedAttendance = await attendance.save();
    res.status(201).json(savedAttendance);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Attendance record already exists for this employee and date' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

// Update attendance record
const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    
    res.json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete attendance record
const deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    res.json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get attendance statistics
const getAttendanceStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const totalEmployees = await Employee.countDocuments({ status: 'Active' });
    const todayAttendance = await Attendance.find({ date: today });
    
    const present = todayAttendance.filter(a => a.status === 'Present').length;
    const absent = todayAttendance.filter(a => a.status === 'Absent').length;
    const late = todayAttendance.filter(a => a.status === 'Late').length;
    const onLeave = todayAttendance.filter(a => a.status === 'On Leave').length;
    
    const attendanceRate = totalEmployees > 0 ? ((present + late) / totalEmployees * 100).toFixed(1) : 0;
    
    // Weekly trend
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - 6);
    
    const weeklyAttendance = await Attendance.aggregate([
      {
        $match: {
          date: { $gte: weekStart, $lte: today }
        }
      },
      {
        $group: {
          _id: {
            date: '$date',
            status: '$status'
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.date',
          statusCounts: {
            $push: {
              status: '$_id.status',
              count: '$count'
            }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    // Leave distribution
    const leaveDistribution = await Attendance.aggregate([
      {
        $match: {
          status: 'On Leave',
          date: { $gte: weekStart, $lte: today }
        }
      },
      {
        $group: {
          _id: '$leaveType',
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.json({
      totalEmployees,
      present,
      absent,
      late,
      onLeave,
      attendanceRate: parseFloat(attendanceRate),
      weeklyTrend: weeklyAttendance,
      leaveDistribution
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark attendance
const markAttendance = async (req, res) => {
  try {
    const { employeeId, status, checkIn, checkOut, notes, leaveType } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Get employee details
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    // Check if attendance already exists for today
    const existingAttendance = await Attendance.findOne({
      employeeId,
      date: today
    });
    
    if (existingAttendance) {
      // Update existing record
      existingAttendance.status = status;
      existingAttendance.checkIn = checkIn || existingAttendance.checkIn;
      existingAttendance.checkOut = checkOut || existingAttendance.checkOut;
      existingAttendance.notes = notes || existingAttendance.notes;
      existingAttendance.leaveType = leaveType || existingAttendance.leaveType;
      
      // Calculate hours worked
      if (checkIn && checkOut) {
        const checkInTime = new Date(`2000-01-01 ${checkIn}`);
        const checkOutTime = new Date(`2000-01-01 ${checkOut}`);
        const diffMs = checkOutTime - checkInTime;
        existingAttendance.hoursWorked = Math.max(0, diffMs / (1000 * 60 * 60));
      }
      
      await existingAttendance.save();
      res.json(existingAttendance);
    } else {
      // Create new record
      const hoursWorked = checkIn && checkOut ? 
        Math.max(0, (new Date(`2000-01-01 ${checkOut}`) - new Date(`2000-01-01 ${checkIn}`)) / (1000 * 60 * 60)) : 0;
      
      const attendance = new Attendance({
        employeeId,
        employeeName: employee.name,
        department: employee.department,
        date: today,
        status,
        checkIn,
        checkOut,
        hoursWorked,
        notes,
        leaveType
      });
      
      const savedAttendance = await attendance.save();
      res.status(201).json(savedAttendance);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
  getAttendanceStats,
  markAttendance
};