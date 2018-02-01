export interface Literal {
    type: "literal";
    value: number;
}

export type BinaryOperators = "+" | "-" | "*" | "/";
export interface BinaryOperation {
    type: "binary";
    operator: BinaryOperators;
    left: Expression;
    right: Expression;
}

export type Expression = Literal | BinaryOperation;
