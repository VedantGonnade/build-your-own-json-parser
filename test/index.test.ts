import { parseJson, readJson } from "../src/utils/jsonOperation.ts";

describe("JSON parser test step 1", () => {
  it("should validate a correct Json file in step 1 directory", () => {
    const filePath = "tests/step1/valid.json";
    const json = readJson(filePath);
    const result = parseJson(json);
    expect(result).toBeTruthy;
  });

  it("should invalidate an incorrect Json file in step 1 directory", () => {
    const filePath = "tests/step1/invalid.json";
    const json = readJson(filePath);
    const result = parseJson(json);
    expect(result).toBeFalsy;
  });
});
