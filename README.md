# Sample Project using ts-jest

The goal in this project is to create a TypeScript project that can do all of the following:

* Compile code an es5 library that can be published as a Node module with typings.
* Using `jest` and `ts-jest` for testing
* Provide accurate code coverage metrics
* Can be debugged using the Node debugger with proper source maps
* Provides proper stack traces for failed tests

## Basic Setup

### Module and Dependencies

I start by initialing this as an `npm` project.

```sh
$ yarn init .
```

Then, I install `typescript`, `jest`, `ts-jest` and `@types/jest` as dependencies:

```sh
$ yarn add -D typescript jest ts-jest @types/jest
```

At the time of this writing, that means `typescript@2.7.1`, `jest@22.1.4` and `ts-jest@22.0.2`.

### TypeScript

Next, we initialize this as a TypeScript project using:

```sh
$ npx tsc --init .
```

I want my TypeScript generated code to be stored in `./lib` and I want declarations generated.
So, I configure `outDir` in `tsconfig.json` to be `./lib`.

### Files

My `.gitignore` is then configured to be:

```sh
/node_modules
/lib
```

...while my `.npmignore` is just:

```sh
/node_modules
```

For the same reason, I remove the default value for `files` in `tsconfig.json` and replace it with:

```json
    "exclude": ["node_modules", "lib"]
```

### Source

To start, I create a `src/index.ts` that contains a simple function:

```typescript
export function sampleFunction(x: string): string {
    return x + x;
}
```

I also add a simple `jest` test. I prefer to keep my tests in a completely separate
location, so I'll put all my tests in `__tests__`. So I create the following test case
in `__tests__/base.spec.ts`:

```typescript
import { sampleFunction } from "../src";

describe("This is a simple test", () => {
    test("Check the sampleFunction function", () => {
        expect(sampleFunction("hello")).toEqual("hellohello");
    });
});
```

### Configurating Jest

At this point, I'd like to run that test. But first I need to create a `jest.config.js`
file for all my `jest` settings. This has to take into account the fact that I'm using
`ts-jest` and the fact that my tests are stored in `__tests__`. So the resulting file
looks like this:

```js
module.exports = {
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
```

### Scripts

I then add the following scripts to `package.json`:

```json
  "scripts": {
    "compile": "tsc",
    "test": "jest"
  }
```

At this point, if I run `yarn test`, I get exactly what I was hoping for:

```
 PASS  __tests__/base.spec.ts
  This is a simple test
    ✓ Check the sampleFunction function (3ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
```
