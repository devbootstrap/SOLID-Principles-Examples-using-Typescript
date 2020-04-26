import StoreLogger from './StoreLogger'
import StoreCache from './StoreCache'
import FileStore from './FileStore'
import MessageStore from './MessageStore';

// Test the StoreLogger class
console.log("** Test the StoreLogger class **")
console.log()
var logger = new StoreLogger()
logger.saving(1);
logger.saved(1);
logger.readingFilestore(1);
logger.didNotFind(1);
logger.readingCache(1);
console.log()

// Test the StoreCache class
console.log("** Test the StoreCache class **")
console.log()
var cache = new StoreCache(logger);
cache.addOrUpdate(1, 'Message 1')
console.log(cache.checkCache()) // Should have { '1': 'Message 1'}
var message1 = cache.getOrAdd(1);
console.log(message1) // Should be 'Message 1'
var exists2 = cache.exists(2)
console.log("Message 2 Exists?", exists2)
var message2 = cache.getOrAdd(2, "Message 2");
console.log();

(async () => {
  // Test the FileStore class
  console.log("** Test the FileStore class **")
  console.log()
  var directory = "./testfiles"
  var filestore = new FileStore(directory, logger)
  var fileInfo = filestore.getFileInfo(1)
  console.log(fileInfo);
  await filestore.save(1, 'Message File 1')
  var fileMessage1 = filestore.read(1)
  console.log(fileMessage1)
  var fileMessage2 = filestore.read(2)
  console.log(fileMessage2)
  await filestore.save(2, 'Message File 2')
  var fileMessage2 = filestore.read(2)
  console.log(fileMessage2)
  console.log()

  // Test the MessageStore class
  console.log("** Test the MessageStore class **")
  console.log()
  var messagestore = new MessageStore(directory);
  await messagestore.save(99, 'Message 99 saved via MessageStore class')
  var fileMessage99 = messagestore.read(99)
  console.log(fileMessage99)
  console.log()
})();