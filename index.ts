import { parseJson, readJson } from "./utils/jsonOperation.ts";

const standardInput = process.stdin;
standardInput.setEncoding("utf-8");
console.log("Enter the file name to run the Json parser");

standardInput.on("data", (data: Buffer) => {
  const input: string = data.toString().trim();

  if (input === "exit") {
    process.exit(1);
  } else {
    const json = readJson(input);
    const result = parseJson(json.trim());
    if (result) console.log("Valid JSON");
    else console.log("Invalid JSON");
    process.exit(0);
  }
});
