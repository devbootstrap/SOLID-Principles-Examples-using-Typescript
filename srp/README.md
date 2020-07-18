# Single Responsibility Principle

This is a basic TypeScript application to demo the Single Responsibility Principle (SRP).

## What is the Single Responsibility Principle?

The **Single Responsibility Principle (SRP)** defines that a class should have a single responsibility. However, what is that responsibility supposed to be defined as?

A definition of responsibility is to have a reason to change. So, therefore, a class should only have one reason to change. This is fundamentally based on the need to separate the concerns. So if we have a need in our application for logging or caching or storing or whatever then these concerns need to be separated and written into separate classes each with their own SRP.

Another way of putting this would be to say **each class should do one thing and do it well**. The UNIX operating system is built on this principle and has thrived on it. UNIX has a number of CLIs / command line applications that do one thing very well, like `grep` or `sed` and these can be composed into applications or scripts or combined using pipes (|) very easily to make larger, more complex systems.

## Reasons for Change

What is the reason for the [FileStore](../start/src/FileStore.ts) class to change (Answer is below!):

The answers are:

* logging
* caching
* storage
* orchestration

## Applying the SRP based on the reasons for change

What we do is take each one of the reasons for change listed above and extract into a separate class.

So firstly, let's extract all _logging logic_ into a new class called [StoreLogger](./src/StoreLogger.ts) like so. Note that it is domain specific for our Store and not just a generic Logger.

What we have done is extracted all the various log calls to a new class. Now this means that if we want to change the logging framework that we use - perhaps because the open source project that built the logger framework becomes depreciated or we find a better solution well now we can change in just this one place.

To use this new logger, we create an instance of it in the [MessageStore](./src/MessageStore.ts) class - perviously called FileStore (I'll explain why the name was changed below).

Now we replace the calls to `console.xyz(...)` to `this.log.xyz(...)` for example:

* Replace: `console.log(“some message: ”, id)`
* With: `this.log.Saving(id)`

The next thing we need to extract is the logic for caching which can be applied in pretty much the same way. We create a new class [StoreCache](./src/StoreCache.ts).

Then we need to create an instance of this class in our MessageStore class and call that instead through the implementation.

```ts
this.cache = new StoreCache(); // in the MessageStore constructor
---
this.cache.AddOrUpdate(id, message); // in the Save method
```

Next reason to change that we can address is the way that we apply storage. This will allow us to change where we save files - perhaps to a relational database instead of a filestore - who knows! So what we do is create a separate class called FileSore that is just for reading / writing files to the filestore and use that in our [MessageStore](./src/MessageStore.ts) class in the same way as before.

So what are we left with? A better implementation for this class that is now split into other classes each with a Single Responsibility!

## Running the application

Install the dependences. Note this includes `node-ts` which allows to run TypeScript files without having to compile first.

**NOTE:** Make sure you change your directory into the [srp](./srp) directory first!

```
npm install
```

Now, it should be possible to run the application using the following commands. Note this is the _first step_ that we are taking to refactor the original file which is in the root of this project which is the file [FileStore.ts](../FileStore.ts).

```
ts-node src/TestExamples.ts
```

Alternatively, you can compile the TypeScript files and then run the output JavaScript files form the resuling `dist` folder:

```
npm run build
node dist/TestExamples.js
```