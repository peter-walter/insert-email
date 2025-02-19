import { isValidEmail } from "./isValidEmail";

/**
 * Sets an email address as the `mailto:` link and text content of anchor (`<a>`) elements.
 *
 * This function constructs an email address from a given `name` and `domain`,
 * validates it, and updates the anchor element's `href` and text content.
 *
 * - If an `element` is provided, it must be an `<a>` tag, or an error is thrown.
 * - If a `selector` is provided as a string, all matching `<a>` elements are updated.
 * - If the email format is invalid, an error is thrown.
 * - The function sets `href="mailto:name@domain"` and displays the email as the anchor text.
 *
 * @param {HTMLAnchorElement | string | null} target - The `<a>` element or a selector string to update.
 * @param {string} name - The local part of the email address (before the `@` symbol).
 * @param {string} domain - The domain part of the email address (after the `@` symbol).
 *
 * @throws {Error} If `element` is not an `<a>` tag.
 * @throws {Error} If the constructed email is invalid.
 *
 * @example
 * ```html
 * <a id="emailLink"></a>
 * <script>
 *   const element = document.getElementById("emailLink");
 *   insertEmail(element, "john.doe", "example.com");
 *   // Updates: <a href="mailto:john.doe@example.com">john.doe@example.com</a>
 * </script>
 * ```
 *
 * @example
 * ```html
 * <a class="email-link"></a>
 * <a class="email-link"></a>
 * <script>
 *   insertEmail("a.email-link", "john.doe", "example.com");
 *   // Updates all anchor tags with class "email-link"
 * </script>
 * ```
 */
export default function insertEmail(
  target: HTMLAnchorElement | string | null,
  name: string,
  domain: string,
): void {
  const email = `${name.trim()}@${domain.trim()}`;
  if (!isValidEmail(email)) throw new Error("Email is invalid.");

  const applyToElement = (el: HTMLAnchorElement) => {
    if (!(el instanceof HTMLAnchorElement))
      throw new Error("Element is not an anchor element.");
    el.setAttribute("href", `mailto:${email}`);
    el.textContent = email;
  };

  if (!target) {
    throw new Error("Element is null or undefined.");
  } else if (typeof target === "string") {
    document
      .querySelectorAll<HTMLAnchorElement>(target)
      .forEach(applyToElement);
  } else {
    applyToElement(target);
  }
}
