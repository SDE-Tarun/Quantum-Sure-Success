const validateScanPayload = (data, { partial = false } = {}) => {
  const errors = [];

  if (!partial || data.name !== undefined) {
    if (!data.name || typeof data.name !== "string") {
      errors.push("name is required");
    }
  }

  if (!partial || data.slug !== undefined) {
    if (!data.slug || typeof data.slug !== "string") {
      errors.push("slug is required");
    }
  }

  if (!partial || data.description !== undefined) {
    if (!data.description || typeof data.description !== "string") {
      errors.push("description is required");
    }
  }

  if (!partial || data.price !== undefined) {
    if (
      data.price === undefined ||
      typeof data.price !== "number" ||
      data.price < 0
    ) {
      errors.push("price must be a valid non-negative number");
    }
  }

  if (!partial || data.domains !== undefined) {
    if (!Array.isArray(data.domains)) {
      errors.push("domains must be an array");
    } else if (data.domains.length !== 25) {
      errors.push("exactly 25 domains are required");
    }
  }

  return errors;
};

module.exports = {
  validateScanPayload,
};