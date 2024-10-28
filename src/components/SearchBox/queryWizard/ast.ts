import { Token, Operator } from './tokens';

export type ASTNodeComparison = {
  type: 'comparison';
  key: string;
  value: string;
  operator: '=';
};

export type ASTNodeGroup = { type: 'group'; expression: ASTNode };

export type ASTNodeExpression = {
  type: 'expression';
  operator: Operator;
  expressions: ASTNode[];
};

export type ASTNode = ASTNodeExpression | ASTNodeComparison | ASTNodeGroup;

const parseString = (tokens: Token[]) => {
  const [keyToken, operatorToken, valueToken] = tokens;

  if (operatorToken?.type !== 'operator') {
    throw new Error('Expected an operator (like `=`) after key');
  }
  if (valueToken?.type !== 'string') {
    throw new Error('Expected a value after "="');
  }

  return [
    {
      type: 'comparison',
      key: keyToken.value,
      value: valueToken.value,
      operator: operatorToken.value,
    },
    3,
  ] as const;
};

const parseTokens = (
  tokens: Token[],
  startIndex: number = 0,
): [ASTNode, number] => {
  const expressions: ASTNode[] = [];
  let operator: Operator | null = null;
  let i = startIndex;

  while (i < tokens.length) {
    const token = tokens[i];

    switch (token.type) {
      case 'string': {
        const [expression, indexIncrease] = parseString(tokens.slice(i));

        expressions.push(expression);
        i += indexIncrease;
        break;
      }

      case 'logical': {
        if (operator && operator !== token.value) {
          throw new Error(
            `Mixed logical operators (${operator} and ${token.value}) are not supported`,
          );
        }
        operator = token.value;
        i++;
        break;
      }

      case 'bracket': {
        switch (token.value) {
          case 'opening':
            const [groupExpression, nextIndex] = parseTokens(tokens, i + 1);
            expressions.push({ type: 'group', expression: groupExpression });
            i = nextIndex;
            break;
          case 'closing':
            return [
              operator
                ? { type: 'expression', operator, expressions }
                : expressions[0],
              i + 1,
            ];
        }
        break;
      }

      default:
        throw new Error(`Unexpected token type: ${token.type}`);
    }
  }

  return [
    operator ? { type: 'expression', operator, expressions } : expressions[0],
    i,
  ];
};

export const generateAst = (tokens: Token[]): ASTNode => {
  const [node] = parseTokens(tokens);
  return node;
};
