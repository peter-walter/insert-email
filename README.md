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

## Examples

- **Updating a single anchor element by node**:

```html
<a id="emailLink"></a>
<script>
  // Updates: <a id="emailLink" href="mailto:john.doe@example.com">john.doe@example.com</a>
  const element = document.getElementById("emailLink");
  insertEmail(element, "john.doe", "example.com");
</script>
```

- **Updating multiple anchor elements by selector**:

```html
<a class="email-link"></a>
<a class="email-link">email us</a>
<script>
  // Updates first link to: <a class="email-link" href="mailto:john.doe@example.com">john.doe@example.com</a>
  // Updates second link to: <a class="email-link" href="mailto:john.doe@example.com">email us</a>
  insertEmail("a.email-link", "john.doe", "example.com");
</script>
```

## License

This package is released under the MIT License.
