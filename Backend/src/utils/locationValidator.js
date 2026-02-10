/**
 * Validates that a location string is non-empty and reasonable.
 * Can be extended later with geo-tagging or city database lookup.
 *
 * @param {string} location - The location string to validate
 * @returns {{ valid: boolean, message?: string }}
 */
const validateLocation = (location) => {
  if (!location || typeof location !== "string") {
    return { valid: false, message: "Location is required" };
  }

  const trimmed = location.trim();

  if (trimmed.length < 2) {
    return { valid: false, message: "Location must be at least 2 characters" };
  }

  if (trimmed.length > 100) {
    return { valid: false, message: "Location cannot exceed 100 characters" };
  }

  return { valid: true };
};

module.exports = { validateLocation };
