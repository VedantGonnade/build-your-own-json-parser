import { TokenType } from "./tokenType.ts";

export class Token {
  public static createToken(type: TokenType, value?: string) {
    return { type, value };
  }
}
