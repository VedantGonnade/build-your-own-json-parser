export enum TokenType {
  LeftBrace,
  RightBrace,
  EOF,
};

export const charToTokenTypeMap: { [key: string]: TokenType } = {
  "{":  TokenType.LeftBrace,
  "}": TokenType.RightBrace,
};

