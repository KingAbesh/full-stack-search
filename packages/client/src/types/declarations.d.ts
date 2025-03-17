import "@testing-library/jest-dom";

declare module "@testing-library/jest-dom" {
  interface Matchers<R> {
    toHaveTextContent(text: string | RegExp): R;
  }
}
