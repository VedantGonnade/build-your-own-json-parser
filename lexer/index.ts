import { Token } from "./token.ts";
import { TokenType, charToTokenTypeMap } from "./tokenType.ts";

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

    if(currentChar) {
      return this.returnToken(currentChar);
    } else {
      throw new Error(`Invalid character: ${currentChar}`);
    }
  }

  private returnToken(char: string) {
    this.position++;
    return new Token(charToTokenTypeMap[char], char);
  }
}
