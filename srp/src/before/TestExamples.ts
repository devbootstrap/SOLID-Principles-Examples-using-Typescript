import FileStore from './FileStore'

// Testing the FileStore class...
let filestore = new FileStore("./testfiles");

// Wrap the tests in an async anonymous function
// so that we can call await on filestore writes
(async () => {
  await filestore.save(1, 'This message 1');
  console.log("Check Cache @1: ", filestore.checkCache())
  var message1 = filestore.read(1);
  console.log("Message 1 Returned: ", message1)
  var message2 = filestore.read(2); // Not found
  console.log("Message 2 Returned: ", message2)
  console.log("Check Cache @2a: ", filestore.checkCache())
  await filestore.save(2, 'This message 2');
  console.log("Check Cache @2b: ", filestore.checkCache())
  var message2 = filestore.read(2);
  console.log("Message 2 Returned: ", message2)
})();