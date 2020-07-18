# Interface Substitution Principle

This is a basic TypeScript application to demo the Interface Substitution Principle (ISP).

We are progressing on from the LSP excercise so we are essentially refactoring  the code that already exists in [../lsp/src](../lsp/src) folder. Please refer to that code as a starting reference.

## What is the Interface Substitution Principle?

The Interface Segregation Principle (ISP) states that Clients should not be forced to depend on methods they do not use.

So it's important, at this point, to understand **who owns the Interface**? It's _not_ defined by the concrete class that uses it, instead it is the **client that owns the interface**. Remember that interfaces are used to help introduce loose coupling. So it's not the concrete class that needs the interface - its the client that needs the interface.

So it's the client that owns the interface and the client defines what it needs. Therefore there is no need for the client to define a method on that interface if it does not need that method!

This should lead us to producing simple, focused interfaces and, futher, we should favour _Role Interfaces_ over _Header Interfaces_.

### Header Interfaces

These are basically the fully extracted interfaces that we have already seen. It is an interface that is extracted from a concrete class and generally includes lots of (i.e. too many) members. Recall, also, that these potentially break the Liskov Substitution Principle and are another reason to avoid these types of interfaces. They are called header interfaces  since they are similar to the way C or C++ works in that a header file (.h) is required to include all the definitions of the members of the concrete implementation file (.c).  These are essentially redundant files that duplicate what is already available in the implementation file.

So a header interface is similar to a header file in that it just states that these are all the methods available in a certain concrete class. Therefore, if you have a header interface with a large number of members then it becomes unlikely that you will ever have a need for a different concrete class that would need exactly the same interface - without having to violate the LSP (by needing to throw lots of “NotSupportedExceptions” everywhere).

### Role Interfaces

A role interface is an interface that defines very few members. So in being client driven and client owned then it will only define the set of members that it actually needs to talk to. So an extreme role interface is one with just one member. It turns out that **defining role interfaces with just one member makes it easier to solve any violations of the LSP**. With only one member defined there is no interaction with other members because there aren't any!

### Refactorings made in this project

To fix the violation of the LSP from the previous exercies, where we have the SqlStore having to implement a method that it cannot via the IStore interface, we simply create a new interface and remove that method from IStore. The result, of course is that we no longer need to define a method that we done need `getFileInfo()` in the [SqlStore](./src/SqlStore.ts) class, like so:

```ts
export default interface IFileLocator {
  getFileInfo(id: number): string
}
```

Note that in the in the [SqlStore](./src/SqlStore.ts) class the getFileInfo method has been removed.

We also exctracted some commonality. One thing is that there are many cases of different classes using a message call `xyz(id: number, message: string): void`. Note that I call this xyz becuase when looking for a common interface the method name can be ignored for the time being and we only need to focus on the input parameters and the response type. So here the input was alwayws `id:number` and `message:string` with a return of `void`. So we can define a new interface that defines that method format as an [IStoreWriter](.src/IStoreWriter.ts) interface. As you can see its a good example of a _role interface_.

```ts
export default interface IStoreWriter {
  save(id: number, message: string): void
}
```

This can now be implemented in the [FileStore](./src/FileStore.ts) and [SqlStore](./src/SqlStore.ts) classes.

### Further refactoring to create log classes that can implement IStoreWriter

As you can see we also added two new classes [LogSavedStoreWriter](./src/LogSaveedStoreWriter.ts) and [LogSavingStoreWriter](./src/LogSavingStoreWriter.ts). However, these are just examples to show how we found other uses of methods with the same signature but with differnt names and in order to get the same name we needed these two new classes. However, this does indeed break the Open Closed Priniple. So we will solve this in the next module by using composition instead of inheritance.

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