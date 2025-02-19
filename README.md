# insertEmail

A JavaScript utility for updating anchor (`<a>`) elements with a valid `mailto:` email link.

## Installation

Install the package via npm:

```sh
npm install insert-email
```

## Usage

Import and use the function in your JavaScript or TypeScript project:

### JavaScript (CommonJS)

```js
const insertEmail = require("insert-email").default;

insertEmail(".email-link", "john.doe", "example.com");
```

### TypeScript / ES Module

```ts
import insertEmail from "insert-email";

insertEmail(".email-link", "john.doe", "example.com");
```

## Function Signature

```ts
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
 */
export default function insertEmail(
  target: HTMLAnchorElement | string | null,
  name: string,
  domain: string,
): void;
```

## Examples

- **Updating a single anchor element**:
  ```html
  <a id="emailLink"></a>
  <script>
    const element = document.getElementById("emailLink");
    insertEmail(element, "john.doe", "example.com");
    // Updates: <a href="mailto:john.doe@example.com">john.doe@example.com</a>
  </script>
  ```

- **Updating multiple anchor elements by selector**:
  ```html
  <a class="email-link"></a>
  <a class="email-link"></a>
  <script>
    insertEmail(".email-link", "john.doe", "example.com");
    // Updates all anchor tags with class "email-link"
  </script>
  ```

## License

This package is released under the MIT License.
