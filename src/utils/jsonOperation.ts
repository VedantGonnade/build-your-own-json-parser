import path from "path";
import fs from "fs";
import { Parser } from "../parser/index.ts";

function readJson(fileName: string): string {
  const filePath: string = path.resolve(fileName);
  return fs.readFileSync(filePath, "utf-8");
}

function parseJson(content: string): boolean {
  const parser: Parser = new Parser(content);
  return parser.parse();
}

export { readJson, parseJson };
