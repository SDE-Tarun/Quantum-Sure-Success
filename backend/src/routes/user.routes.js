const express = require("express");

const {
  createTestUser,
  getUsers,
  getCurrentUser,
  adminTest
} = require("../controllers/user.controller");

const {
  authenticate,
  authorizeRoles,
} = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/test", createTestUser);

router.get("/", getUsers);

router.get("/me", authenticate, getCurrentUser);

router.get(
  "/admin-test",
  authenticate,
  authorizeRoles("admin"),
  adminTest
);

module.exports = router;