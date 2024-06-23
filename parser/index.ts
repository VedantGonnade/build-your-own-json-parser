import { Lexer } from "../lexer/index.ts";
import { Token } from "../lexer/token.ts";
import { TokenType } from "../lexer/tokenType.ts";

class Parser {
  private leser: Lexer;
  private currentToken: Token;

  constructor(input: string) {
    this.leser = new Lexer(input);
    this.currentToken = this.leser.nextToken();
  }

  public parse(): boolean {
    let leftBraceCount = 0;

    while (this.currentToken.type !== TokenType.EOF) {
      if (this.currentToken.type === TokenType.LeftBrace) {
        leftBraceCount++;
      } else if (this.currentToken.type === TokenType.RightBrace) {
        if (leftBraceCount === 0) {
          return false;
        }
        leftBraceCount--;
      }

      this.currentToken = this.leser.nextToken();
    }

    return leftBraceCount === 0;
  }
}

// Example usage:
const input1 = '{}'; // Valid
const input2 = '{{}'; // Invalid
const input3 = '{}}'; // Invalid

const parser1 = new Parser(input1);
console.log(`Input '${input1}' is valid: ${parser1.parse()}`);

const parser2 = new Parser(input2);
console.log(`Input '${input2}' is valid: ${parser2.parse()}`);

const parser3 = new Parser(input3);
console.log(`Input '${input3}' is valid: ${parser3.parse()}`);
