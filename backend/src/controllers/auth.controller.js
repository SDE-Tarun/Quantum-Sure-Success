const User = require("../models/user.model");

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} = require("../utils/jwt");

const {
  hashPassword,
  comparePassword,
} = require("../utils/password");

const register = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
    } = req.body;

    console.log("Request body data", req.body.firstName, req.body.email, req.body.password)

    if (!firstName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "First name, email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName?.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      phone,
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive",
      });
    }

    const isPasswordValid = await comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token is required",
      });
    }

    const decoded = verifyRefreshToken(refreshToken);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account no longer exists",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "User account is inactive",
      });
    }

    const accessToken = generateAccessToken(user);

    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }

    next(error);
  }
};

module.exports = {
  register,
  login,
  refreshAccessToken,
};