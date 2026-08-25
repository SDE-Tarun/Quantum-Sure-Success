const mongoose = require("mongoose");
const Scan = require("../models/scan.model");
const env = require("../config/env");

const createTestDomains = () => {
  return Array.from({ length: 25 }, (_, index) => ({
    name: `Test Domain ${index + 1}`,
    description: `Temporary test domain ${index + 1}`,
    order: index + 1,
    isActive: true,
  }));
};

const testScan = {
  name: "Sun",
  slug: "sun",
  description: "Temporary Sun Scan data for development testing.",
  benefits: [
    "Test benefit 1",
    "Test benefit 2",
  ],
  price: 999,
  currency: "INR",
  domains: createTestDomains(),
  isActive: true,
  displayOrder: 1,
};

const seed = async () => {
  try {
    await mongoose.connect(env.mongoUri);

    await Scan.deleteMany({
      slug: "sun",
    });

    await Scan.create(testScan);

    console.log("Test Sun scan created successfully.");

    await mongoose.disconnect();

    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);

    await mongoose.disconnect();

    process.exit(1);
  }
};

seed();