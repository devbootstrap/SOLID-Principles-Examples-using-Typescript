# Single Responsibility Principle

This is a basic TypeScript application to demo the Single Responsibility Principle (SRP).

## What is the Single Responsibility Principle?

[TODO]

## Running the application

Install the dependences. Note this includes `node-ts` which allows to run TypeScript files without having to compile first.

```
npm install
```

Now, it should be possible to run the application using the following commands. Note the code in [src/before](./src/before) is _before_ we apply any refactoring for the Single Responsibility Principle and the code in [src/after](./src/after) is _after_ we apply the refactoring for SRP.

```
npx ts-node src/before/fileStore.ts
npx ts-node src/after/fileStore.ts
```

Alternatively, you can compile the TypeScript files and then run the output JavaScript files form the resuling `dist` folder:

```
npm run build
node dist/person.js
```