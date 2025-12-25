// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const expenseRoutes = require("./routes/expenseRoutes");

// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose
//   .connect(
//     "mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/test"
//   )
//   .then(() => console.log("MongoDB connected"))
//   .catch(console.error);

// app.use("/api/expenses", expenseRoutes);

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const employeeRoutes = require("./routes/employeeRoutes");
 // ✅ REQUIRED

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/test"
  )
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

// Routes

app.use("/api/employees", employeeRoutes);
 // 🔥 FIX



app.listen(6000, () => {
  console.log("Server running on port 6000");
});
