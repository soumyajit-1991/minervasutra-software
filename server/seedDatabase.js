const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const Employee = require('./models/Employee');
const Training = require('./models/Training');
const PTO = require('./models/PTO');
const TimeSheet = require('./models/TimeSheet');
const Customer = require('./models/Customer');
const Product = require('./models/Product');
const Doctor = require('./models/Doctor');
const Supplier = require('./models/Supplier');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Sample data
const sampleEmployees = [
  {
    name: 'John Smith',
    email: 'john.smith@pharmacy.com',
    phone: '+1-555-0101',
    role: 'Senior Pharmacist',
    department: 'Pharmacy Operations',
    location: 'New York',
    salary: 75000
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@pharmacy.com',
    phone: '+1-555-0102',
    role: 'HR Manager',
    department: 'Human Resources',
    location: 'New York',
    salary: 65000
  },
  {
    name: 'Mike Davis',
    email: 'mike.davis@pharmacy.com',
    phone: '+1-555-0103',
    role: 'Clinical Pharmacist',
    department: 'Clinical Services',
    location: 'Boston',
    salary: 70000
  }
];

const sampleTrainings = [
  {
    title: 'Pharmaceutical Safety Protocols',
    description: 'Comprehensive training on safety protocols and best practices in pharmaceutical handling',
    instructor: 'Dr. Emily Wilson',
    category: 'Safety',
    status: 'Upcoming',
    startDate: '2024-02-01',
    endDate: '2024-02-03',
    duration: '3 days',
    mode: 'In-Person',
    location: 'Main Training Center',
    capacity: 20,
    enrolled: 15,
    prerequisites: ['Basic Pharmacy Knowledge', 'Safety Certification']
  },
  {
    title: 'Customer Service Excellence',
    description: 'Advanced customer service techniques for pharmacy staff',
    instructor: 'Maria Rodriguez',
    category: 'Customer Service',
    status: 'Ongoing',
    startDate: '2024-01-15',
    endDate: '2024-01-20',
    duration: '5 days',
    mode: 'Virtual',
    location: 'Online Platform',
    capacity: 30,
    enrolled: 25,
    prerequisites: []
  }
];

const sampleCustomers = [
  {
    name: 'Alice Brown',
    phone: '+1-555-1001',
    address: '123 Main St, New York, NY 10001',
    balance: 0,
    associatedDoctors: []
  },
  {
    name: 'Robert Wilson',
    phone: '+1-555-1002',
    address: '456 Oak Ave, Boston, MA 02101',
    balance: 150.75,
    associatedDoctors: []
  }
];

const sampleProducts = [
  {
    name: 'Paracetamol 500mg',
    type: 'Tablet',
    stock: 500,
    price: 12.99,
    manufacturingDate: '2023-06-01',
    expiryDate: '2025-06-01'
  },
  {
    name: 'Amoxicillin 250mg',
    type: 'Capsule',
    stock: 200,
    price: 25.50,
    manufacturingDate: '2023-08-15',
    expiryDate: '2025-08-15'
  }
];

const sampleDoctors = [
  {
    name: 'Dr. James Anderson',
    specialty: 'General Medicine',
    phone: '+1-555-2001',
    email: 'j.anderson@hospital.com',
    fees: 150,
    availability: 'Mon-Fri 9AM-5PM'
  },
  {
    name: 'Dr. Lisa Chen',
    specialty: 'Cardiology',
    phone: '+1-555-2002',
    email: 'l.chen@hospital.com',
    fees: 200,
    availability: 'Tue-Thu 10AM-4PM'
  }
];

const sampleSuppliers = [
  {
    name: 'MediSupply Corp',
    contact: '+1-555-3001',
    email: 'orders@medisupply.com',
    address: '789 Industrial Blvd, Chicago, IL 60601',
    products: ['Paracetamol', 'Antibiotics', 'Vitamins']
  },
  {
    name: 'PharmaDistributors Inc',
    contact: '+1-555-3002',
    email: 'sales@pharmadist.com',
    address: '321 Commerce St, Los Angeles, CA 90001',
    products: ['Prescription Drugs', 'Medical Supplies']
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await Employee.deleteMany({});
    await Training.deleteMany({});
    await PTO.deleteMany({});
    await TimeSheet.deleteMany({});
    await Customer.deleteMany({});
    await Product.deleteMany({});
    await Doctor.deleteMany({});
    await Supplier.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Insert sample data
    const employees = await Employee.insertMany(sampleEmployees);
    console.log(`👥 Created ${employees.length} employees`);

    const trainings = await Training.insertMany(sampleTrainings);
    console.log(`🎓 Created ${trainings.length} trainings`);

    const customers = await Customer.insertMany(sampleCustomers);
    console.log(`👤 Created ${customers.length} customers`);

    const products = await Product.insertMany(sampleProducts);
    console.log(`💊 Created ${products.length} products`);

    const doctors = await Doctor.insertMany(sampleDoctors);
    console.log(`👨‍⚕️ Created ${doctors.length} doctors`);

    const suppliers = await Supplier.insertMany(sampleSuppliers);
    console.log(`🏢 Created ${suppliers.length} suppliers`);

    // Create sample PTO requests using employee IDs
    const samplePTORequests = [
      {
        employeeId: employees[0]._id,
        employeeName: employees[0].name,
        type: 'Vacation',
        startDate: '2024-02-15',
        endDate: '2024-02-20',
        days: 5,
        reason: 'Family vacation',
        status: 'Pending',
        requestedDate: '2024-01-15'
      },
      {
        employeeId: employees[1]._id,
        employeeName: employees[1].name,
        type: 'Sick Leave',
        startDate: '2024-01-25',
        endDate: '2024-01-26',
        days: 2,
        reason: 'Medical appointment',
        status: 'Approved',
        requestedDate: '2024-01-20',
        approvedBy: 'HR Manager',
        approvalDate: '2024-01-22'
      }
    ];

    const ptoRequests = await PTO.insertMany(samplePTORequests);
    console.log(`🏖️  Created ${ptoRequests.length} PTO requests`);

    // Create sample timesheets
    const sampleTimesheets = [
      {
        employeeId: employees[0]._id,
        employeeName: employees[0].name,
        weekStartDate: '2024-01-15',
        weekEndDate: '2024-01-19',
        totalHours: 40,
        regularHours: 40,
        overtimeHours: 0,
        status: 'Approved',
        weekData: [
          { day: 'Monday', date: '2024-01-15', hours: 8, overtime: 0, status: 'Approved' },
          { day: 'Tuesday', date: '2024-01-16', hours: 8, overtime: 0, status: 'Approved' },
          { day: 'Wednesday', date: '2024-01-17', hours: 8, overtime: 0, status: 'Approved' },
          { day: 'Thursday', date: '2024-01-18', hours: 8, overtime: 0, status: 'Approved' },
          { day: 'Friday', date: '2024-01-19', hours: 8, overtime: 0, status: 'Approved' }
        ],
        approvedBy: 'HR Manager',
        approvalDate: '2024-01-22'
      }
    ];

    const timesheets = await TimeSheet.insertMany(sampleTimesheets);
    console.log(`⏰ Created ${timesheets.length} timesheets`);

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   • ${employees.length} Employees`);
    console.log(`   • ${trainings.length} Training Programs`);
    console.log(`   • ${ptoRequests.length} PTO Requests`);
    console.log(`   • ${timesheets.length} Timesheets`);
    console.log(`   • ${customers.length} Customers`);
    console.log(`   • ${products.length} Products`);
    console.log(`   • ${doctors.length} Doctors`);
    console.log(`   • ${suppliers.length} Suppliers`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run seeding
connectDB().then(seedDatabase);

module.exports = { seedDatabase };