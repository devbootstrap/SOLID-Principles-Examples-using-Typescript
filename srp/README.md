# Single Responsibility Principle

This is a basic TypeScript application to demo the Single Responsibility Principle (SRP).

## What is the Single Responsibility Principle?

The Single Responsibility Principle defines that a class should have a single responsibility. However, what is that responsibility supposed to be defined as?

A definition of responsibility is to have a reason to change. So, therefore, a class should only have one reason to change. This is fundamentally based on the need to separate the concerns. So if we have a need in our application for logging or caching or storing or whatever then these concerns need to be separated and written into separate classes each with their own SRP.

Another way of putting this would be to say each class should do one thing and do it well. The UNIX operating system is built on this principle and has thrived on it. UNIX has a number of CLIs / command line applications that do one thing very well, like `grep` or `sed` and these can be composed into applications or scripts or combined using pipes (|) very easily to make larger, more complex systems.

## Reasons for Change

What is the reason for the [FileStore class](./src/before/fileStore.ts) to change (Answer is below!):

The answers are:

* logging
* caching
* storage
* orchestration

## Applying the SRP based on the reasons for change

What we do is take each one of the reasons for change listed above and extract into a separate class.

So firstly, let's extract all _logging logic_ into a new class called [StoreLogger](./src/after/storeLogger.ts) like so. Note that it is domain specific for our Store and not just a generic Logger.

What we have done is extracted all the various log calls to a new class. Now this means that if we want to change the logging framework that we use - perhaps because the open source project that built the logger framework becomes depreciated or we find a better solution well now we can change in just this one place.

To use this new logger, we create an instance of it in the [message store class](./src/after/messageStore.ts) - perviously called FileStore (I'll explain why the name was changed below).

## Running the application

Install the dependences. Note this includes `node-ts` which allows to run TypeScript files without having to compile first.

**NOTE:** Make sure you change your directory into the [srp](./srp) directory first!

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