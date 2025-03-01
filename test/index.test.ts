import { describe, it, expect, beforeEach } from "vitest";
import insertEmail from "../src";

describe("insertEmail", () => {
  beforeEach(() => {
    // Create a clean DOM before each test.
    document.body.innerHTML = "";
  });

  it("should correctly set the email href and text content", () => {
    const anchor = document.createElement("a");
    insertEmail(anchor, "john.doe", "example.com");

    expect(anchor.getAttribute("href")).toString().startsWith("mailto:");

    expect(anchor.getAttribute("href")).toBe("mailto:john.doe@example.com");
    expect(anchor.textContent).toBe("john.doe@example.com");
  });

  it("should throw an error if element is unexpected", () => {
    const invalidElements = [null, undefined, "", {}, []];

    invalidElements.forEach((element) => {
      expect(() =>
        insertEmail(
          element as unknown as HTMLAnchorElement,
          "john.doe",
          "example.com",
        ),
      ).toThrowError("Element cannot be null or undefined.");
    });
  });

  it("should throw an error if element is a div instead of an anchor", () => {
    const invalidElementTypes = ["div", "span", "p", "img", "INVALID"];

    invalidElementTypes.forEach((elementType) => {
      const element = document.createElement(elementType);
      expect(() =>
        insertEmail(
          element as unknown as HTMLAnchorElement,
          "john.doe",
          "example.com",
        ),
      ).toThrowError(
        `Expected an anchor element (<a>), but received a ${elementType.toLowerCase()}.`,
      );
    });
  });

  it("should throw an error when any selector is not an achor tag", () => {
    document.body.innerHTML = `
      <a class="email"></a>
      <div class="email"></a>
      <span class="email"></a>
    `;

    expect(() => insertEmail(".email", "john.doe", "example.com")).toThrowError(
      "Expected an anchor element (<a>), but received a div.",
    );
  });

  it("should not overwrite any existing content in element, but should overwrite href", () => {
    document.body.innerHTML = `
      <a class="email primary" href="mailto:noreply@test.com"></a>
      <a class="email secondary" href="mailto:noreply@test.com">email us</a>
    `;

    const primary = document.querySelector("a.primary") as HTMLElement;
    const secondary = document.querySelector("a.secondary") as HTMLElement;

    insertEmail("a.email", "john.doe", "example.com");

    expect(primary.textContent).toBe("john.doe@example.com");
    expect(primary.getAttribute("href")).toBe("mailto:john.doe@example.com");

    expect(secondary.textContent).toBe("email us");
    expect(secondary.getAttribute("href")).toBe("mailto:john.doe@example.com");
  });

  it("should update one or more element if a selector is used", () => {
    document.body.innerHTML = `
      <a class="email primary"></a>
      <a class="email secondary"></a>
      <a class="notemail tertiary"></a>
      <div class="email"></div>
      <span class="email"></span>
    `;

    insertEmail("a.email", "john.doe", "example.com");

    expect(document.querySelectorAll("a.email")).lengthOf(2);
    document.querySelectorAll("a.email").forEach((element) => {
      expect(element.textContent).toBe("john.doe@example.com");
      expect(element.getAttribute("href")).toString().startsWith("mailto:");
    });

    expect(document.querySelectorAll("a.notemail")).lengthOf(1);
    document.querySelectorAll("a.notemail").forEach((element) => {
      expect(element.textContent).not.toBe("john.doe@example.com");
    });

    expect(document.querySelectorAll("div")).lengthOf(1);
    document.querySelectorAll("div").forEach((element) => {
      expect(element.textContent).not.toBe("john.doe@example.com");
    });

    expect(document.querySelectorAll("span")).lengthOf(1);
    document.querySelectorAll("span").forEach((element) => {
      expect(element.textContent).not.toBe("john.doe@example.com");
    });
  });

  it("should update one or more element if multiple selectors are used", () => {
    document.body.innerHTML = `
      <a class="primary"></a>
      <a class="secondary"></a>
      <a class="tertiary"></a>
    `;

    insertEmail("a.primary,a.secondary", "john.doe", "example.com");

    expect(document.querySelectorAll("a")).lengthOf(3);

    document.querySelectorAll("a.primary,a.secondary").forEach((element) => {
      expect(element.textContent).toBe("john.doe@example.com");
      expect(element.getAttribute("href")).toString().startsWith("mailto:");
    });
    document.querySelectorAll("a.tertiary").forEach((element) => {
      expect(element.textContent).not.toBe("john.doe@example.com");
    });
  });

  it("should not throw an error if selector returns and empty set", () => {
    document.body.innerHTML = `
      <a class="email"></a>
    `;

    expect(document.querySelectorAll("ul")).lengthOf(0);

    expect(() => insertEmail("ul", "john.doe", "example.com")).not.toThrow();
  });

  it("should throw an error for an invalid email format", () => {
    const anchor = document.createElement("a");
    expect(() =>
      insertEmail(anchor, "invalid-email@", "example.com"),
    ).toThrowError("Email is invalid.");
    expect(() =>
      insertEmail(anchor, "invalid-email", "@example.com"),
    ).toThrowError("Email is invalid.");
  });

  it("should trim whitespace from name and domain", () => {
    const anchor = document.createElement("a");
    insertEmail(anchor, "  john.doe  ", "  example.com  ");

    expect(anchor.getAttribute("href")).toBe("mailto:john.doe@example.com");
    expect(anchor.textContent).toBe("john.doe@example.com");
  });

  it("should throw an error for an empty name", () => {
    const anchor = document.createElement("a");
    expect(() => insertEmail(anchor, "", "example.com")).toThrowError(
      "Email name is empty.",
    );
  });

  it("should throw an error for an empty domain", () => {
    const anchor = document.createElement("a");
    expect(() => insertEmail(anchor, "john.doe", "")).toThrowError(
      "Email domain is empty.",
    );
  });

  it("should throw an error for an empty name and domain", () => {
    const anchor = document.createElement("a");
    expect(() => insertEmail(anchor, "", "")).toThrowError(
      "Email name is empty.",
    );
  });
});
