# Open Closed Principle

This is a basic TypeScript application to demo the Open Closed Principle (OCP).

We are progressing on from the SRP excercise so we are essentially refactoring the code that already exists in [../srp/src/](../srp/src/) folder. Please refer to that code as a starting reference.

## What is the Open Closed Principle?

The **Open Closed Principle (OCP)** states that a class should **be open for extensibility and closed for modification**.

What this means is that as soon as your class is in the wild and being used by other clients then you should not change its behaviour. However, it should be possible to extend the class so that it's possible to redefine its behaviour. Note, of course, that **bug fixes are allowed to be fixed** and therefore you are required to modify the class directly in this case!

Naturally, if you break this principle and modify a core class functionality that is already deployed into a production environment and is being used by 3rd party client applications or other parts of your system then this change can have a profound impact on the system and users of that system.

Note that this principle is based around examples of Inheritance and so therefore the examples will be based on Inheritance. However, **later on we will show how we prefer composition over inheritance** as a general rule.

## Example: Extending the behaviour StoreLogger Class

We could use inheritance to redefine one of our classes, for example the [StoreLogger](./src/StoreLogger.ts) class. We could redefine each of the methods with calls to a different type of logger solution and call that the [StoreLoggerSplunk](./src/StoreLoggerSplunk.ts) class since we may want to log to a remote [Splunk](https://www.splunk.com/) application.

However, one thing to note is that in the [MessageStore](./src/MessageStore.ts) class we are creating an instance of the [StoreLogger](./src/StoreLogger.ts) class and we cannot change that to [StoreLoggerSplunk](./src/StoreLoggerSplunk.ts) class (because the MessageStore class _is closed for modification_). So what is the solution in this case?

One solution when using inheritance based extensibility then we could change the class using a _Factory Method_. A Factory Method is a design pattern that is used to create a new instance of polymorphic class.

So the solution is to provide a new _getter method_ in the [MessageStore](./src/MessageStore.ts) class that can be extended if the client wishes to use the new [StoreLoggerSplunk](./src/StoreLoggerSplunk.ts) class if they so desire. We also have to update calls to the logger from `this.logger` to `this.Logger` (using the new method name defined).

So the getter method in the MessageStore class looks like this:

```ts
get Logger() {
  return this.logger;
}
```

...and we also change any calls to `this.logger` to `this.Logger` (note the upper case L so that we end up calling the getter method). In our MessageStore class we only call this in the constructor so its easy to change.

We then create a hypothetical [StoreLoggerSplunk](./src/StoreLoggerSplunk.ts) class that simply extends StoreLogger and routes all calls to (a fake) Splunk endpoint. Here is a sample of that code:

```ts
import StoreLogger from './StoreLogger'

export default class StoreLoggerSplunk extends StoreLogger {
  public saving(id: number): void {
    this.SplunkLogger(`Saving message ${id}.`)
  }

  // etc

  private SplunkLogger(log: string) {
    console.log("Logged to Splunk: ", log);
  }
}
```

To use this new type of logger we also need to extend the MessageStore and then redefine the getter method defined earlier to fetch the logger like so:

```ts
export default class CustomMessageStore extends MessageStore {
  get Logger() {
    return new StoreLoggerSplunk()
  }
}
```

Now we can use this new class and it will behave exactly as before with just one change - it now logs to Splunk! Take a look at [TestExamples](./src/TestExamples.ts) for an example on how to do this.

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