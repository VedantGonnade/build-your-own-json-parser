import { Lexer } from "../lexer/index.ts";
import { Token } from "../lexer/token.ts";
import { TokenType } from "../lexer/tokenType.ts";

export class Parser {
  private lexer: Lexer;
  private currentToken: Token;

  constructor(input: string) {
    this.lexer = new Lexer(input);
    this.currentToken = this.lexer.nextToken();
  }

  public parse(): boolean {
    let leftBraceCount: number = 0;

    if (this.currentToken.type === TokenType.EOF) return false;

    while (this.currentToken.type !== TokenType.EOF) {
      if (this.currentToken.type === TokenType.LeftBrace) {
        leftBraceCount++;
      } else if (this.currentToken.type === TokenType.RightBrace) {
        if (leftBraceCount === 0) {
          return false;
        }
        leftBraceCount--;
      }

      this.currentToken = this.lexer.nextToken();
    }
    return leftBraceCount === 0;
  }
}
