import { describe, it, expect } from "vitest";
import { isValidEmail } from "../src/isValidEmail";

describe("isValidEmail", () => {
  it("should return true for valid email addresses", () => {
    const validEmails = [
      "test@example.com",
      "user.name@sub.domain.co",
      "name+tag@example.co.uk",
      "valid_123@domain.org",
      "name@domain.com",
    ];

    validEmails.forEach((email) => {
      expect(isValidEmail(email)).toBe(true);
    });
  });

  it("should return false for invalid email addresses", () => {
    const invalidEmails = [
      "plainaddress",
      "@missingusername.com",
      "username@.com",
      "user@domain,com", // Invalid character
      "user@domain..com", // Double dot
      "user@domain@com", // Double @
      "user@domain.", // Trailing dot
      "user@domain..com", // Double dot in domain part
    ];

    invalidEmails.forEach((email) => {
      expect(isValidEmail(email)).toBe(false);
    });
  });

  it("should return false for empty email string", () => {
    expect(isValidEmail("")).toBe(false);
  });
});
