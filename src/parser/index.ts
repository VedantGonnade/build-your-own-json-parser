import { TokenType } from "../lexer/tokenType.ts";


interface Body {
  type: "ObjectExpression",
  properties?: any 
}
interface Parser {
  type: "Program",
  body?: Body[]
}

export const parser = (tokens: Array<{ type: string; value?: any }>) => {
  let current = 0;

  const mainBody: Parser = {
    type: "Program",
    body: []
  }

  const walk = () => {
    let token = tokens[current];

    if (token.type === TokenType.LEFT_BRACE) {
      token = tokens[++current];

      const node: Body = {
        type: "ObjectExpression",
        properties: [],
      };

      while (token.type !== TokenType.RIGHT_BRACE) {
        const property: { type: string; key: any; value: any } = {
          type: "Property",
          key: token,
          value: null,
        };

        token = tokens[++current];

        token = tokens[++current];
        property.value = walk();
        node.properties?.push(property);

        token = tokens[current];
        if (token.type === TokenType.COMMA) {
          token = tokens[++current];
        }
      }

      current++;
      // console.log(node)
      mainBody.body?.push(node)
      console.log(mainBody)

      return node;
    }
  };
  walk();
};

console.log(
  parser([
    { type: "LEFT_BRACE", value: undefined },
  ])
);
