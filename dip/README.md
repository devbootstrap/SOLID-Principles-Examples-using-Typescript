# Dependency InvesionPrinciple

This is a basic TypeScript application to demo the Dependency InvesionPrinciple (ISP).

We are progressing on from the LSP excercise so we are essentially refactoring  the code that already exists in [../isp/src](../isp/src) folder. Please refer to that code as a starting reference.

## What is the Dependency Invesion Principle?

[TODO]

## Running the application

Install the dependences. Note this includes `node-ts` which allows to run TypeScript files without having to compile first.

**NOTE:** Make sure you change your directory into the [lsp](./lsp) directory first!

```
npm install
```

Now, it should be possible to run the application using the following commands.

```
npx ts-node src/TestExamples.ts
```

Alternatively, you can compile the TypeScript files and then run the output JavaScript files form the resuling `dist` folder:

```
npm run build
node dist/TestExamples.js
```