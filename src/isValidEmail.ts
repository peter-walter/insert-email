/**
 * Validates if the given email address is in a valid format.
 *
 * This function uses a regular expression to check if the email string
 * matches the standard format for a valid email address. The regex takes
 * into account common email patterns but does not guarantee the email
 * exists or is in use.
 *
 * @param {string} email - The email address to be validated.
 * @returns {boolean} Returns `true` if the email matches the valid format, otherwise `false`.
 */
export function isValidEmail(email: string): boolean {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email,
  );
}
