import { Expression } from "./types";
import { assertNever } from "../utils";

export function evaluate(expr: Expression): number {
    switch (expr.type) {
        case "literal": {
            return expr.value;
        }
        case "binary": {
            switch (expr.operator) {
                case "+":
                    return evaluate(expr.left) + evaluate(expr.right);
                case "-":
                    return evaluate(expr.left) - evaluate(expr.right);
                case "*":
                    return evaluate(expr.left) * evaluate(expr.right);
                case "/":
                    return evaluate(expr.left) / evaluate(expr.right);
                /* istanbul ignore next */
                default: {
                    return assertNever("Unexpected binary operator", expr.operator);
                }
            }
        }
        /* istanbul ignore next */
        default: {
            return assertNever("Unexpected expression type", expr);
        }
    }
}
