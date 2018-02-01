# Sample Project using ts-jest

The goal in this project is to create a TypeScript project that can do all of the following:

* Compile code an es5 library that can be published as a Node module with typings.
* Using `jest` and `ts-jest` for testing
* Provide accurate code coverage metrics
* Can be debugged using the Node debugger with proper source maps
* Provides proper stack traces for failed tests

## Setup

I start by initialing this as an `npm` project.

```sh
$ yarn init .
```

Then, I install `typescript`, `jest` and `ts-jest` as dependencies:

```sh
$ yarn add -D typescript jest ts-jest
```

At the time of this writing, that means `typescript@2.7.1`, `jest@22.1.4` and `ts-jest@22.0.2`.

Next, we initialize this as a TypeScript project using:

```sh
$ npx tsc --init .
```

I want my TypeScript generated code to be stored in `./lib` and I want declarations generated.
So, I configure `outDir` in `tsconfig.json` to be `./lib`.

My `.gitignore` is then configured to be:

```sh
/node_modules
/lib
```

...while my `.npmignore` is just:

```sh
/node_modules
```

To start, I create a `src/index.ts` that contains a simple function:

```typescript
export function sampleFunction(x: string): string {
    return x + x;
}
```
