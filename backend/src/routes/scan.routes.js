const express = require("express");

const {
  getAllScans,
  getScanBySlug,
} = require("../controllers/scan.controller");

const router = express.Router();

router.get("/", getAllScans);

router.get("/:slug", getScanBySlug);

module.exports = router;