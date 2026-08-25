const User = require("../models/user.model");

const createTestUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "firstName, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "Test user created successfully",
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select(
      "_id firstName lastName email phone role isActive isEmailVerified createdAt"
    );

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const adminTest = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Admin access granted",
    data: {
      userId: req.user._id,
      role: req.user.role,
    },
  });
};

module.exports = {
  createTestUser,
  getUsers,
  getCurrentUser,
  adminTest
};