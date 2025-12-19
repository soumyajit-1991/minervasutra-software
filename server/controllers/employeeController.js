const Employee = require('../models/Employee');
const mongoose = require('mongoose');

// Helper to check database connection
const checkDBConnection = () => {
  if (mongoose.connection.readyState !== 1) {
    throw new Error("Database not connected. Please check MONGO_URI environment variable.");
  }
};

const generateEmployeeId = async () => {
  const lastEmployee = await Employee.findOne({}, { employeeId: 1 }).sort({ createdAt: -1 });
  let nextId = 1;
  if (lastEmployee && lastEmployee.employeeId) {
    const lastIdNum = parseInt(lastEmployee.employeeId.replace('EMP', ''), 10);
    if (!isNaN(lastIdNum)) {
      nextId = lastIdNum + 1;
    }
  }
  let candidate = `EMP${String(nextId).padStart(4, '0')}`;

  // Double check uniqueness
  while (await Employee.exists({ employeeId: candidate })) {
    nextId++;
    candidate = `EMP${String(nextId).padStart(4, '0')}`;
  }
  return candidate;
};

const generateUsername = async (name) => {
  const base = name.toLowerCase().replace(/\s+/g, '.');
  let candidate = `${base}.${Math.floor(1000 + Math.random() * 9000)}`;
  // Ensure uniqueness
  // Loop is acceptable because we expect few collisions.
  while (await Employee.exists({ username: candidate })) {
    candidate = `${base}.${Math.floor(1000 + Math.random() * 9000)}`;
  }
  return candidate;
};

const generatePassword = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789!@#$%';
  let pwd = '';
  for (let i = 0; i < 10; i += 1) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pwd;
};

exports.getAllEmployees = async (req, res) => {
  try {
    checkDBConnection();
    const employees = await Employee.find().sort({ createdAt: -1 }).lean();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeId: req.params.id });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    checkDBConnection();
    const { name, mobile, email, aadhaar, address, role, gender, salary, hoursWorked, branch } = req.body;

    // Validate required fields
    if (!name || !mobile || !email || !aadhaar || !address || !role || !gender || !salary) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (await Employee.exists({ email })) {
      return res.status(409).json({ message: 'Employee with this email already exists' });
    }

    if (await Employee.exists({ aadhaar })) {
      return res.status(409).json({ message: 'Employee with this Aadhaar already exists' });
    }

    // Validate hoursWorked array if provided
    if (hoursWorked && (!Array.isArray(hoursWorked) || hoursWorked.some(h => !h.month || h.hours === undefined))) {
      return res.status(400).json({ message: 'Invalid hoursWorked data' });
    }

    const employeeId = await generateEmployeeId();
    const username = await generateUsername(name);
    const password = generatePassword();

    const employee = new Employee({
      employeeId,
      username,
      password,
      name: typeof name === 'string' ? name.trim() : name,
      mobile,
      email: typeof email === 'string' ? email.trim().toLowerCase() : email,
      aadhaar,
      address: typeof address === 'string' ? address.trim() : address,
      role: typeof role === 'string' ? role.trim() : role,
      gender: typeof gender === 'string' ? gender.trim() : gender,
      branch: branch || '',
      salary,
      hoursWorked: hoursWorked || []
    });

    const savedEmployee = await employee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee', error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { name, mobile, email, aadhaar, address, role, gender, salary, hoursWorked, branch, username, password } = req.body;

    const updateData = {};
    if (name) updateData.name = typeof name === 'string' ? name.trim() : name;
    if (mobile) updateData.mobile = mobile;
    if (email) updateData.email = typeof email === 'string' ? email.trim().toLowerCase() : email;
    if (aadhaar) updateData.aadhaar = aadhaar;
    if (address) updateData.address = typeof address === 'string' ? address.trim() : address;
    if (role) updateData.role = typeof role === 'string' ? role.trim() : role;
    if (gender) updateData.gender = typeof gender === 'string' ? gender.trim() : gender;
    if (branch !== undefined) updateData.branch = branch;
    if (username) updateData.username = username;
    if (password) updateData.password = password;
    if (salary) updateData.salary = salary;
    if (hoursWorked) {
      if (!Array.isArray(hoursWorked) || hoursWorked.some(h => !h.month || h.hours === undefined)) {
        return res.status(400).json({ message: 'Invalid hoursWorked data' });
      }
      updateData.hoursWorked = hoursWorked;
    }

    const employee = await Employee.findOneAndUpdate(
      { employeeId: req.params.id },
      { ...updateData, updatedAt: Date.now() },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete({ employeeId: req.params.id });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error: error.message });
  }
};
