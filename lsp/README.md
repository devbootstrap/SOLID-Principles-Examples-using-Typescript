# Liskov Substitution Principle

This is a basic TypeScript application to demo the Liskov Substitution Principle (LSP).

We are progressing on from the OCP excercise so we are essentially refactoring the code that already exists in [../ocp/src](../ocp/src) folder. Please refer to that code as a starting reference.

## What is the Liskov Substitution Principle?

The LSP can be defined as the following:

* Subtypes must be substitutable for their base types OR (another way....)
* Given any client, it should be able to apply any implementation of an interface without changing the correctness of the system

So what does the **correctness of the system** mean? Well for starters, it's not about changing the behaviour of the system because polymorphism is about changing the behaviour. Ultimately the correctness of the system is application specific but one high level idea is that any software system should not crash so if a client uses implementation A of an interface and the system does not crash, but then uses implementation B of an interface and the system DOES crash then you can say that you have changed the correctness of the system. That's a high level generic explanation as to the correctness of the system.

So you can think of the correctness of the system as the superset of all the correct behaviour. If you stay within that boundary then you have not changed the correctness of the system. Go outside and you have changed it (like if it causes the system to crash).

## When is the LSP violated?

### Throwing _NotSupportedException_ (or similar).

So for example if you implement an interface that does not require or its not possible to implement a method based on that interface then a typical thing to do is to throw an exception stating that the method is not implemented or not supported. Here in this [SqlStore](./src/SqlStore.ts) example we throw a new Error and pass in the appropriate message `throw new Error("Method not implemented.");`. Doing this violates the Liskov Substitution Principle.

```ts
class SqlStore implements IStore {
  save(id: number, message: string): void {
    // Write to database code would go here
  }
  read(id: number): string {
    // Read from database here
    return ''
  }
  /**
   * Note that we need to throw 'Method not implemented' here
   * because in the context of the SqlStore the 'getFileInfo'
   * method is not required.
   *
   * Note: THIS BREAKS LSP!! We will discuss a solution to this later.
   */
  getFileInfo(id: number): string {
    throw new Error("Method not implemented.");
  }
}
```

As noted in the code comments we will discuss how to fix this in later lessons.

### Downcasts

Another reason is if you are using downcasts a lot in your code to check which is the concrete implementation of an Interface. You might have a method that accepts a specific interface and you can use downcasting to check what is the actual concrete class that is being passed into the function that implements it. This shows a risk that you might be breaking the LSP.

### Extracted Interfaces

This is when you take a concrete class and extract an interface from it. If you end up creating many interfaces (perhaps via the IDE that you use) and you just select to implement all methods of the concrete class into that interface then you can be at risk of violating the LSP.

The below extracted [IStore](./src/IStore.ts) interface from the [FileStore](./src/FileStore.ts) concrete class does, in fact, violate ISP (in the implemtation of it in SqlStore example above).

```ts
interface IStore {
  save(id: number, message: string): void
  read(id: number): string
  getFileInfo(id: number): string
}
```

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