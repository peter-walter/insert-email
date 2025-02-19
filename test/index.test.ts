import { describe, it, expect } from "vitest";
import insertEmail from "../src";

describe("insertEmail", () => {
  it("should correctly set the email href and text content", () => {
    const anchor = document.createElement("a");
    insertEmail(anchor, "john.doe", "example.com");

    expect(anchor.getAttribute("href")).toBe("mailto:john.doe@example.com");
    expect(anchor.textContent).toBe("john.doe@example.com");
  });

  it("should throw an error if element is null", () => {
    expect(() => insertEmail(null, "john.doe", "example.com")).toThrowError(
      "Element is null or undefined.",
    );
  });

  it("should throw an error if element is not an anchor tag", () => {
    const div = document.createElement("div"); // Not an <a> tag
    expect(() =>
      insertEmail(
        div as unknown as HTMLAnchorElement,
        "john.doe",
        "example.com",
      ),
    ).toThrowError("Element is not an anchor element.");
  });

  it("should update one or more element if a selector is used", () => {
    document.body.innerHTML = `
            <a class="email"></span>
            <a class="email"></span>
            <div class="email"></span>
        `;
    insertEmail("a.email", "john.doe", "example.com");

    document.querySelectorAll("a.email").forEach((element) => {
      expect(element.textContent).toBe("john.doe@example.com");
    });
    document.querySelectorAll("div.email").forEach((element) => {
      expect(element.textContent).not.toBe("john.doe@example.com");
    });
  });

  it("should not throw an error if invalid selector is used", () => {
    document.body.innerHTML = `
            <a class="email"></span>
            <a class="email"></span>
            <div class="email"></span>
        `;
    expect(() => insertEmail("ul", "john.doe", "example.com")).not.toThrow();
  });

  it("should throw an error for an invalid email format", () => {
    const anchor = document.createElement("a");
    expect(() =>
      insertEmail(anchor, "invalid-email@", "example.com"),
    ).toThrowError("Email is invalid.");
  });

  it("should trim whitespace from name and domain", () => {
    const anchor = document.createElement("a");
    insertEmail(anchor, "  john.doe  ", "  example.com  ");

    expect(anchor.getAttribute("href")).toBe("mailto:john.doe@example.com");
    expect(anchor.textContent).toBe("john.doe@example.com");
  });
});
