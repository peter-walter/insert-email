import { isValidEmail } from "./isValidEmail";

/**
 * Sets an email address as the `mailto:` link and text content of anchor (`<a>`) elements.
 *
 * This function constructs an email address from a given `name` and `domain`,
 * validates it, and updates the anchor element's `href`. It will also up the text content
 * of the element if it is empty.
 *
 * - If an `element` is provided, it must be an `<a>` tag, or an error is thrown.
 * - If a `selector` is provided as a string, all matching `<a>` elements are updated.
 * - If the email format is invalid, an error is thrown.
 * - The function sets `href="mailto:name@domain"`
 * - The function sets the anchor text to `name@domain`, if it is blank.
 *
 * @param {HTMLAnchorElement | string} target - The `<a>` element, or a element selector string to update.
 * @param {string} name - The local part of the email address (before the `@` symbol).
 * @param {string} domain - The domain part of the email address (after the `@` symbol).
 *
 * @throws {Error} If any element to update is not an anchor or is not defined.
 * @throws {Error} If the constructed email is invalid.
 *
 * @example
 * ```html
 * <a id="emailLink"></a>
 * <script>
 *   // Updates: <a id="emailLink" href="mailto:john.doe@example.com">john.doe@example.com</a>
 *   const element = document.getElementById("emailLink");
 *   insertEmail(element, "john.doe", "example.com");
 * </script>
 * ```
 *
 * @example
 * ```html
 * <a class="email-link"></a>
 * <a class="email-link">email us</a>
 * <script>
 *   // Updates first link to: <a class="email-link" href="mailto:john.doe@example.com">john.doe@example.com</a>
 *   // Updates second link to: <a class="email-link" href="mailto:john.doe@example.com">email us</a>
 *   insertEmail("a.email-link", "john.doe", "example.com");
 * </script>
 * ```
 */
export default function insertEmail(
  target: HTMLAnchorElement | string,
  name: string,
  domain: string,
): void {
  if (
    target === null ||
    target === undefined ||
    (typeof target === "object" && !(target instanceof HTMLElement)) ||
    (typeof target === "string" && !target.trim())
  ) {
    throw new Error("Element cannot be null or undefined.");
  }

  if (!name.trim()) {
    throw new Error("Email name is empty.");
  }

  if (!domain.trim()) {
    throw new Error("Email domain is empty.");
  }

  const email = `${name.trim()}@${domain.trim()}`;
  if (!isValidEmail(email)) throw new Error("Email is invalid.");

  const applyToElement = (el: HTMLElement) => {
    if (!(el instanceof HTMLAnchorElement))
      throw new Error(
        `Expected an anchor element (<a>), but received a ${el.tagName.toLowerCase()}.`,
      );
    el.setAttribute("href", `mailto:${email}`);
    if (el.textContent?.trim() === "") {
      el.textContent = email;
    }
  };

  if (typeof target === "string") {
    document.querySelectorAll<HTMLElement>(target).forEach(applyToElement);
  } else {
    applyToElement(target);
  }
}
