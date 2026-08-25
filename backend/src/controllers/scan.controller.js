const Scan = require("../models/scan.model");
const { validateScanPayload } = require("../utils/scan.validation");

const getAllScans = async (req, res, next) => {
  try {
    const scans = await Scan.find({
      isActive: true,
    }).sort({
      displayOrder: 1,
    });

    return res.status(200).json({
      success: true,
      count: scans.length,
      data: scans,
    });
  } catch (error) {
    next(error);
  }
};

const getScanBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const scan = await Scan.findOne({
      slug,
      isActive: true,
    });

    if (!scan) {
      return res.status(404).json({
        success: false,
        message: "Scan not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: scan,
    });
  } catch (error) {
    next(error);
  }
};

const createScan = async (req, res, next) => {
  try {
    const errors = validateScanPayload(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    const {
      name,
      slug,
      description,
      benefits,
      price,
      currency,
      domains,
      displayOrder,
    } = req.body;

    const normalizedSlug = slug.toLowerCase().trim();

    const existingScan = await Scan.findOne({
      $or: [
        { slug: normalizedSlug },
        { name: name.trim() },
      ],
    });

    if (existingScan) {
      return res.status(409).json({
        success: false,
        message: "A scan with this name or slug already exists",
      });
    }

    const scan = await Scan.create({
      name: name.trim(),
      slug: normalizedSlug,
      description: description.trim(),
      benefits: benefits || [],
      price,
      currency: currency || "INR",
      domains,
      displayOrder: displayOrder || 1,
    });

    return res.status(201).json({
      success: true,
      message: "Scan created successfully",
      data: scan,
    });
  } catch (error) {
    next(error);
  }
};

const updateScan = async (req, res, next) => {
  try {
    const errors = validateScanPayload(req.body, {
      partial: true,
    });

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    const { id } = req.params;

    const scan = await Scan.findById(id);

    if (!scan) {
      return res.status(404).json({
        success: false,
        message: "Scan not found",
      });
    }

    const allowedFields = [
      "name",
      "slug",
      "description",
      "benefits",
      "price",
      "currency",
      "domains",
      "displayOrder",
      "isActive",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        scan[field] = req.body[field];
      }
    });

    if (scan.slug) {
      scan.slug = scan.slug.toLowerCase().trim();
    }

    await scan.save();

    return res.status(200).json({
      success: true,
      message: "Scan updated successfully",
      data: scan,
    });
  } catch (error) {
    next(error);
  }
};

const deactivateScan = async (req, res, next) => {
  try {
    const { id } = req.params;

    const scan = await Scan.findById(id);

    if (!scan) {
      return res.status(404).json({
        success: false,
        message: "Scan not found",
      });
    }

    scan.isActive = false;

    await scan.save();

    return res.status(200).json({
      success: true,
      message: "Scan deactivated successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllScans,
  getScanBySlug,
  createScan,
  updateScan,
  deactivateScan,
};