# MINERVASUTRA

A comprehensive full-stack MINERVASUTRA built with React (frontend) and Node.js/Express (backend) with MongoDB database.

## Features

### Core Modules
- **Customer Management**: Add, view, edit, and delete customers with doctor associations
- **Product Management**: Manage pharmacy inventory with stock tracking
- **Doctor Management**: Maintain doctor profiles and appointment scheduling
- **Supplier Management**: Track suppliers and their product offerings
- **Order Management**: Handle customer and supplier orders
- **Employee Management**: HR functionality for staff management
- **Expense Tracking**: Monitor business expenses
- **Analytics Dashboard**: Real-time insights and reporting

### Technical Features
- Responsive dark/light mode interface
- Real-time data synchronization
- RESTful API architecture
- MongoDB database with Mongoose ODM
- Modern React with hooks and context
- Tailwind CSS for styling
- Chart.js for data visualization

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn** package manager

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Pharmacy-Management-System-main
```

### 2. Install Dependencies

#### Frontend Dependencies
```bash
npm install
```

#### Backend Dependencies
```bash
cd server
npm install
cd ..
```

### 3. Environment Configuration

#### Frontend Environment (.env)
```env
VITE_API_URL=https://hr-management-h9l2.vercel.app
```

#### Backend Environment (server/.env)
```env
MONGO_URI=mongodb://localhost:27017/pharmacy_management
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
```

### 4. Database Setup

1. **Start MongoDB Service**
   - Windows: Start MongoDB service from Services
   - macOS: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

2. **Verify MongoDB Connection**
   ```bash
   mongo
   # or
   mongosh
   ```

## Running the Application

### Option 1: Run Both Frontend and Backend Together
```bash
npm run start:dev
```

### Option 2: Run Separately

#### Start Backend Server
```bash
cd server
npm run dev
```

#### Start Frontend Development Server (in new terminal)
```bash
npm run dev
```

## Application URLs

- **Frontend**: http://localhost:5173
- **Backend API**: https://hr-management-h9l2.vercel.app
- **API Health Check**: https://hr-management-h9l2.vercel.app/api/health

## API Endpoints

### Core Endpoints
- `GET /api/health` - Health check
- `GET /api/dashboard/stats` - Dashboard statistics

### Customer Management
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Product Management
- `GET /api/products` - Get all products
- `POST /api/products` - Add new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Doctor Management
- `GET /api/doctors` - Get all doctors
- `POST /api/doctors` - Add new doctor
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor

### Supplier Management
- `GET /api/suppliers` - Get all suppliers
- `POST /api/suppliers` - Add new supplier
- `PUT /api/suppliers/:id` - Update supplier
- `DELETE /api/suppliers/:id` - Delete supplier

## Project Structure

```
pharmacy-management-system/
├── public/                 # Static assets
├── src/                   # Frontend source code
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── addform/          # Form components
│   ├── api/              # API service files
│   ├── context/          # React context providers
│   ├── data/             # Static data files
│   ├── utils/            # Utility functions
│   └── assets/           # Images and icons
├── server/               # Backend source code
│   ├── controllers/      # Route controllers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── config/          # Configuration files
│   └── index.js         # Server entry point
└── package.json         # Project dependencies
```

## Key Features Implementation

### Frontend-Backend Integration
- All major pages (Customers, Products, Doctors, Suppliers) are connected to backend APIs
- Real-time data fetching with loading states and error handling
- Form submissions with validation and success/error feedback

### Database Models
- **Customer**: Name, phone, address, balance, associated doctors
- **Product**: Name, type, stock, pricing, manufacturing/expiry dates
- **Doctor**: Name, specialty, contact info, fees, availability
- **Supplier**: Name, contact details, product catalog

### UI/UX Features
- Responsive design with mobile support
- Dark/light mode toggle
- Interactive charts and data visualization
- Modal dialogs for detailed views
- Pagination and search functionality

## Development Commands

```bash
# Install dependencies
npm install

# Start development servers
npm run start:dev

# Run frontend only
npm run dev

# Run backend only
npm run server

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGO_URI in server/.env
   - Verify database permissions

2. **API Connection Error**
   - Verify backend server is running on port 5000
   - Check VITE_API_URL in frontend .env
   - Ensure no firewall blocking connections

3. **Module Not Found Errors**
   - Run `npm install` in both root and server directories
   - Clear node_modules and reinstall if needed

4. **Port Already in Use**
   - Change PORT in server/.env
   - Update VITE_API_URL accordingly
   - Kill existing processes using the ports

### Database Reset
To reset the database:
```bash
mongo
use pharmacy_management
db.dropDatabase()
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please create an issue in the repository or contact the development team.