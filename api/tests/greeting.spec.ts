import greeting from "../services/greeting";

test("should return 'Hello'", () => {
  expect(greeting()).toBe("Hello");
});
