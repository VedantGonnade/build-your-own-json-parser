import { Token } from "./token.ts";
import { TokenType } from "./tokenType.ts";

export class Lexer {
  private input: string;
  private position: number;

  constructor(input: string) {
    this.input = input;
    this.position = 0;
  }

  public nextToken(): Token {
    if (this.position >= this.input.length) {
      return new Token(TokenType.EOF, "");
    }

    const currentChar = this.input[this.position];

    if (currentChar == "{") {
      this.position++;
      return new Token(TokenType.LeftBrace, "{");
    } else if (currentChar == "}") {
      this.position++;
      return new Token(TokenType.RightBrace, "}");
    } else {
      throw new Error(`Unexpected character: ${currentChar}`);
    }
  }
}
