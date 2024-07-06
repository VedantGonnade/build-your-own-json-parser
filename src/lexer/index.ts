import { TokenType } from "./tokenType.ts";
import { Token } from "./token.ts";

export const lexer = (input: string) => {
  let current = 0;
  let tokens = [];
  const whitespace = /\s/;
  const numbers = /[0-9]/;
  const letters = /[a-zA-Z]/;

  const isWhitspace = (char: string) => {
    return whitespace.test(char);
  };
  const isNumber = (char: string) => {
    return numbers.test(char);
  };
  const isLetter = (char: string) => {
    return letters.test(char);
  };

  const skipWhitespace = () => {
    while (isWhitspace(input[current])) {
      current++;
    }
  };

  const readString = () => {
    let value = "";
    current++
    while (input[current] !== '"') {
      value += input[current++];
    }
    current++
    return value;
  };

  const readNumber = () => {
    let value = "";
    while (isNumber(input[current])) {
      value += input[current++];
    }
    return value;
  };

  function readKeyword(keyword: string, type: TokenType) {
    const value = input.substring(current, current+keyword.length)    
    if (value === keyword) {
      current += keyword.length;
      return Token.createToken(type);
    }
    throw new Error("Unexpected keyword " + input[current]);
  }

  while (current < input.length) {
    let char = input[current];

    switch (char) {
      case "{":
        tokens.push(Token.createToken(TokenType.LEFT_BRACE));
        current++;
        continue;
      case "}":
        tokens.push(Token.createToken(TokenType.RIGHT_BRACE));
        current++;
        continue;
      case "[":
        tokens.push(Token.createToken(TokenType.LEFT_BRACKET));
        current++;
        continue;
      case "]":
        tokens.push(Token.createToken(TokenType.RIGHT_BRACKET));
        current++;
        continue;
      case ",":
        tokens.push(Token.createToken(TokenType.COMMA));
        current++;
        continue;
      case ":":
        tokens.push(Token.createToken(TokenType.COLON));
        current++;
        continue;
      case '"':
        tokens.push(Token.createToken(TokenType.STRING, readString()));
        continue;
      default:
        if (isWhitspace(char)) {
          skipWhitespace();
          continue;
        }

        if (isNumber(char)) {
          tokens.push(Token.createToken(TokenType.NUMBER, readNumber()));
          current++
          continue;
        }

        if (isLetter(char)) {
          switch (char) {
            case "t":
              tokens.push(readKeyword("true", TokenType.TRUE));
              continue;
            case "f":
              tokens.push(readKeyword("false", TokenType.FALSE));
              continue;
            case "n":
              tokens.push(readKeyword("null", TokenType.NULL));
              continue;
            default:
              throw new TypeError("Unexpected character: " + char);
          }
        }
        throw new TypeError("I dont know what this character is: " + char);
    }
  }
  return tokens;
};
