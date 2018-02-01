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

/**
 * Apply procedure or function
 * @param {Object} proc - Procedure
 * @param {Array} args - Arguments
 * @param {Object} self - Self
 * @returns {*} Result of procedure
 */
export function* apply(proc, args, self) {
    var result;
    result = yield* applyInner(proc, args, self);
    while (isLambda(result) && result.thunk === true) {
        //     // trampoline loop - this gets invoked as a result of tail-call optimization
        //     // the function returned a tail-call thunk
        //     // unpack it, evaluate its arguments, and apply the tail call
        var next = yield* evaluate(result.body.procedure, result.input, result.environment);
        var evaluatedArgs = [];
        for (var ii = 0; ii < result.body.arguments.length; ii++) {
            // COMMENT THIS OUT AND THE STACK ISSUE GOES AWAY...
            evaluatedArgs.push(yield* evaluate(result.body.arguments[ii], result.input, result.environment));
        }
        result = yield* applyInner(next, evaluatedArgs, self);
    }
    return result;
}
