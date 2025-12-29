// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // 1️⃣ check user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     // 2️⃣ check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     // 3️⃣ generate token
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       token,
//       role: user.role,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };


const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 2️⃣ plain text password check
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 3️⃣ generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
