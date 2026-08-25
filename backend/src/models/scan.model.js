const mongoose = require("mongoose");

const domainSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Domain name is required"],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    order: {
      type: Number,
      required: true,
      min: 1,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    _id: true,
  }
);

const scanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Scan name is required"],
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
      required: [true, "Scan slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Scan description is required"],
      trim: true,
    },

    benefits: {
      type: [String],
      default: [],
    },

    price: {
      type: Number,
      required: [true, "Scan price is required"],
      min: [0, "Price cannot be negative"],
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true,
    },

    domains: {
      type: [domainSchema],
      validate: {
        validator: function (domains) {
          return domains.length === 25;
        },
        message: "Each scan must contain exactly 25 domains",
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    displayOrder: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Scan = mongoose.model("Scan", scanSchema);

module.exports = Scan;