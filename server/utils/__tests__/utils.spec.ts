import axios from "axios";
import { compose, pipe } from "../ramda";
import { request } from "../request";

// Mock axios.
jest.mock("axios");

describe("Request utils", () => {
  describe("fetchData()", () => {
    it("should return { data: { status: 'OK' } } because it's default return data..", async () => {
      const mockedAxios = axios as jest.Mocked<typeof axios>;
      mockedAxios.get.mockResolvedValue({ data: { status: "OK" } });

      const expected = { data: { status: "OK" } };
      const actual = await request.fetchData("https://mock-api/api/getsomting");

      expect(actual).toEqual(expected);
    });
  });
});

describe("Ramda Utils", () => {
  describe("compose()", () => {
    it("should return fucntion with correct order.", () => {
      const fn1 = (val: string) => `fn1(${val})`;
      const fn2 = (val: string) => `fn2(${val})`;
      const fn3 = (val: string) => `fn3(${val})`;
      const composedFunction = compose(fn1, fn2, fn3);

      expect(composedFunction("inner")).toEqual("fn1(fn2(fn3(inner)))");
    });
  });

  describe("pipe()", () => {
    it("should return fucntion with correct order.", () => {
      const fn1 = (val: string) => `fn1(${val})`;
      const fn2 = (val: string) => `fn2(${val})`;
      const fn3 = (val: string) => `fn3(${val})`;
      const pipedFunction = pipe(fn1, fn2, fn3);

      expect(pipedFunction("inner")).toEqual("fn3(fn2(fn1(inner)))");
    });

    it("pipes functions with different initial type", () => {
      const fn1 = (val: string, num: number) => `fn1(${val}-${num})`;
      const fn2 = (val: string) => `fn2(${val})`;
      const fn3 = (val: string) => `fn3(${val})`;
      const pipedFunction = pipe(fn1, fn2, fn3);

      expect(pipedFunction("inner", 2)).toBe("fn3(fn2(fn1(inner-2)))");
    });
  });
});
