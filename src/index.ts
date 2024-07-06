import { lexer } from "./lexer/index.ts";

const token = lexer('{"name":"Vitor","age":true}');
console.log(token)
