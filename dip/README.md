# Dependency Inversion Principle

This is a basic TypeScript application to demo the Dependency InvesionPrinciple (ISP).

We are progressing on from the LSP excercise so we are essentially refactoring  the code that already exists in [../isp/src](../isp/src) folder. Please refer to that code as a starting reference.

## What is the Dependency Inversion Principle?

This states that high level modules should not depend on low level modules. Both should depend on abstractions.

Moreover, abstractions should not depend on details. The details should depend on abstractions.

So in a way this is closely related to the Interface Segregation Principle in that clients own the interface. So a client can talk to an abstraction because it owns the interface and whatever is on the other side of that abstraction is an implementation detail.

### Refactoring the application

In this application we mostly applied a combination of the **composite** and **decorator** patterns.

The main approach is to include the [IStoreReader](./src/IStoreReader.ts) and [IStoreWriter](./src/IStoreWriter.ts) interfaces in the [FileStore](./src/FileStore.ts), [StoreCache](./src/StoreCache.ts) and [StoreLogger](./src/StoreLogger.ts) classes and then to compoose everything within the StoreLogger so that it acts as the definitive _reader_ and _writer_ implementation.

What we end up with is the [MessageStore](./src/MessageStore.ts) effectivly becomes redundant in this example. However, if there was originally some business logic then this is where it would live.

In order to use this implemetnation the client needs to compose the objects in such away so that they adhear to the requirements of the applications interface. Such a composition to use the application might look like the following example:

```ts
var directory = "./testfiles";
var filestore = new FileStore(directory);
var cache = new StoreCache(filestore, filestore);
var logger = new StoreLogger(cache, cache);
var messagestore = new MessageStore(logger, logger)

// Now we can use our messagestore instance
messagestore.save(99, 'Message 99 is a very important message!')
var msg99 = messagestore.read(99)
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