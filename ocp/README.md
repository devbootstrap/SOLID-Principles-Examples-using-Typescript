# Open Closed Principle

This is a basic TypeScript application to demo the Open Closed Principle (OCP).

We are progressing on from the SRP excercise so we are essentially refactoring  the code that already exists in [../srp/src/after](../srp/src/after) folder. Please refer to that code as a starting reference.

## Running the application

Install the dependences. Note this includes `node-ts` which allows to run TypeScript files without having to compile first.

**NOTE:** Make sure you change your directory into the [ocp](./ocp) directory first!

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