import { TokenType } from "./tokenType.ts";

export class Token {
  constructor(public type: TokenType, public value: string) {}
}
