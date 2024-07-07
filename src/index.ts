import { lexer } from "./lexer/index.ts";

const token = lexer('{');
console.log(token)
