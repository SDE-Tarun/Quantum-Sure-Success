const express = require("express");

const {
  createScan,
  updateScan,
  deactivateScan,
} = require("../controllers/scan.controller");

const {
  authenticate,
  authorizeRoles,
} = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authenticate);
router.use(authorizeRoles("admin"));

router.post("/", createScan);

router.patch("/:id", updateScan);

router.delete("/:id", deactivateScan);

module.exports = router;