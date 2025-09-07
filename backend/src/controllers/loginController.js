// controllers/authController.js
import User from "../models/User.js";

export const checkData = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // 2. Compare plain password
    if (user.password !== password) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // 3. Success
    return res.json({
      success: true,
      message: "Login successful",
      user: { id: user._id, email: user.email, username: user.username }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
