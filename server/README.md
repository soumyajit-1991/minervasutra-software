# HR Management System - Backend API

A comprehensive HR management system backend built with Node.js, Express, and MongoDB.

## Features

### 👥 Employee Management
- Employee directory with profiles
- Personal information and documents
- Skills and experience tracking
- Department and role management

### 🎯 Recruitment Management
- Job posting creation and management
- Candidate pipeline tracking
- Interview scheduling and feedback
- Offer management and negotiation
- Application status tracking

### 📊 Performance & Analytics
- Performance reviews and ratings
- Goal setting and tracking
- Employee feedback system
- Analytics and reporting

### 📚 Training & Development
- Training program management
- Employee enrollment tracking
- Completion certificates
- Feedback and ratings

### ✅ Compliance Management
- Regulatory requirement tracking
- Audit history and documentation
- Reminder system
- Status monitoring

### 💰 Payroll & Expenses
- Payroll calculation and processing
- Expense tracking and approval
- Payment management
- Budget monitoring

### 📝 Notes & Documentation
- Note creation and sharing
- Comment system
- Document attachments
- Search functionality

### 📅 Attendance Tracking
- Daily attendance marking
- Leave management
- Statistics and reporting
- Department-wise tracking

## API Endpoints

### Employee Management
```
GET    /api/employees              # Get all employees
GET    /api/employees/stats        # Get employee statistics
GET    /api/employees/:id          # Get employee by ID
POST   /api/employees              # Create new employee
PUT    /api/employees/:id          # Update employee
DELETE /api/employees/:id          # Delete employee
```

### Job Postings
```
GET    /api/job-postings           # Get all job postings
GET    /api/job-postings/stats     # Get job posting statistics
GET    /api/job-postings/:id       # Get job posting by ID
POST   /api/job-postings           # Create new job posting
PUT    /api/job-postings/:id       # Update job posting
DELETE /api/job-postings/:id       # Delete job posting
```

### Candidates
```
GET    /api/candidates             # Get all candidates
GET    /api/candidates/stats       # Get candidate statistics
GET    /api/candidates/:id         # Get candidate by ID
POST   /api/candidates             # Create new candidate
PUT    /api/candidates/:id         # Update candidate
PUT    /api/candidates/:id/stage   # Update candidate stage
DELETE /api/candidates/:id         # Delete candidate
```

### Interviews
```
GET    /api/interviews             # Get all interviews
GET    /api/interviews/stats       # Get interview statistics
GET    /api/interviews/:id         # Get interview by ID
POST   /api/interviews             # Create new interview
PUT    /api/interviews/:id         # Update interview
PUT    /api/interviews/:id/feedback # Update interview feedback
DELETE /api/interviews/:id         # Delete interview
```

### Offers
```
GET    /api/offers                 # Get all offers
GET    /api/offers/stats           # Get offer statistics
GET    /api/offers/:id             # Get offer by ID
POST   /api/offers                 # Create new offer
PUT    /api/offers/:id             # Update offer
PUT    /api/offers/:id/status      # Update offer status
POST   /api/offers/:id/negotiation # Add negotiation history
DELETE /api/offers/:id             # Delete offer
```

### Attendance
```
GET    /api/attendance             # Get attendance records
GET    /api/attendance/stats       # Get attendance statistics
POST   /api/attendance             # Create attendance record
POST   /api/attendance/mark        # Mark attendance
PUT    /api/attendance/:id         # Update attendance record
DELETE /api/attendance/:id         # Delete attendance record
```

### Payroll
```
GET    /api/payroll                # Get payroll records
GET    /api/payroll/stats          # Get payroll statistics
GET    /api/payroll/:id            # Get payroll by ID
POST   /api/payroll                # Create payroll record
POST   /api/payroll/generate-all   # Generate payroll for all employees
POST   /api/payroll/process        # Process multiple payroll records
PUT    /api/payroll/:id            # Update payroll record
DELETE /api/payroll/:id            # Delete payroll record
```

### Performance
```
GET    /api/performance            # Get performance reviews
GET    /api/performance/stats      # Get performance statistics
GET    /api/performance/:id        # Get performance review by ID
POST   /api/performance            # Create performance review
PUT    /api/performance/:id        # Update performance review
PUT    /api/performance/:id/submit # Submit performance review
PUT    /api/performance/:id/feedback # Add employee feedback
DELETE /api/performance/:id        # Delete performance review
```

### Training
```
GET    /api/trainings              # Get all trainings
GET    /api/trainings/stats        # Get training statistics
GET    /api/trainings/:id          # Get training by ID
POST   /api/trainings              # Create new training
PUT    /api/trainings/:id          # Update training
POST   /api/trainings/:id/enroll   # Enroll employee
POST   /api/trainings/:id/remove   # Remove employee
POST   /api/trainings/:id/complete # Mark as completed
POST   /api/trainings/:id/feedback # Add feedback
DELETE /api/trainings/:id          # Delete training
```

### Compliance
```
GET    /api/compliance             # Get compliance requirements
GET    /api/compliance/stats       # Get compliance statistics
GET    /api/compliance/:id         # Get compliance by ID
POST   /api/compliance             # Create compliance requirement
PUT    /api/compliance/:id         # Update compliance requirement
PUT    /api/compliance/:id/status  # Update compliance status
POST   /api/compliance/:id/audit   # Add audit record
POST   /api/compliance/:id/document # Add document
POST   /api/compliance/:id/reminder # Set reminder
DELETE /api/compliance/:id         # Delete compliance requirement
```

### Expenses
```
GET    /api/expenses               # Get all expenses
GET    /api/expenses/stats         # Get expense statistics
GET    /api/expenses/:id           # Get expense by ID
POST   /api/expenses               # Create new expense
PUT    /api/expenses/:id           # Update expense
POST   /api/expenses/:id/payment   # Make payment
POST   /api/expenses/:id/approve   # Approve expense
DELETE /api/expenses/:id           # Delete expense
```

### Notes
```
GET    /api/notes                  # Get all notes
GET    /api/notes/search           # Search notes
GET    /api/notes/stats            # Get note statistics
GET    /api/notes/:id              # Get note by ID
POST   /api/notes                  # Create new note
PUT    /api/notes/:id              # Update note
POST   /api/notes/:id/share        # Share note
POST   /api/notes/:id/unshare      # Remove share
POST   /api/notes/:id/comment      # Add comment
PUT    /api/notes/:id/archive      # Archive note
DELETE /api/notes/:id              # Delete note
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system or update MONGO_URI in .env

5. **Run the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## Environment Variables

```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/hr_management

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration (for future authentication)
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
```

## Database Models

### Employee
- Personal information and contact details
- Role, department, and employment status
- Skills, experience, and documents
- Performance and attendance tracking

### JobPosting
- Job details and requirements
- Application tracking
- Status management

### Candidate
- Application information
- Pipeline stage tracking
- Resume and documents
- Interview history

### Interview
- Scheduling and logistics
- Feedback and ratings
- Status tracking

### Offer
- Compensation details
- Terms and conditions
- Negotiation history
- Status tracking

### Attendance
- Daily attendance records
- Leave management
- Hours worked tracking

### Payroll
- Salary calculations
- Deductions and bonuses
- Payment processing

### Performance
- Review cycles
- Goals and ratings
- Feedback system

### Training
- Program management
- Enrollment tracking
- Completion certificates

### Compliance
- Regulatory requirements
- Audit history
- Document management

### Expense
- Expense tracking
- Approval workflow
- Payment management

### Note
- Documentation system
- Sharing and collaboration
- Comment system

## API Response Format

### Success Response
```json
{
  "data": {...},
  "message": "Success message"
}
```

### Error Response
```json
{
  "error": "Error message",
  "details": "Additional error details"
}
```

## Development

### Project Structure
```
server/
├── config/
│   └── database.js         # Database configuration
├── controllers/            # Route controllers
├── models/                 # Mongoose models
├── routes/                 # Express routes
├── middleware/             # Custom middleware
├── utils/                  # Utility functions
├── .env                    # Environment variables
├── .env.example           # Environment template
├── index.js               # Main server file
└── package.json           # Dependencies
```

### Adding New Features

1. **Create Model** - Define schema in `models/`
2. **Create Controller** - Add business logic in `controllers/`
3. **Create Routes** - Define endpoints in `routes/`
4. **Update Server** - Import routes in `index.js`

## Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## Testing

The API can be tested using tools like:
- Postman
- Insomnia
- curl
- Frontend application

### Health Check
```bash
curl https://hr-management-backend-w6w4.vercel.app/api/health
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.