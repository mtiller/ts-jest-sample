/* istanbul ignore next */
export function assertNever(msg: string, value: never): never {
    throw new Error(msg + ": " + JSON.stringify(value));
}
