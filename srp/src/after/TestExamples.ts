import StoreLogger from './StoreLogger'
import StoreCache from './StoreCache'
import FileStore from './FileStore'

// Test the StoreLogger class
var logger = new StoreLogger()
logger.saving(1);
logger.saved(1);
logger.reading(1);
logger.didNotFind(1);
logger.reading(1);

// Test the StoreCache class
var cache = new StoreCache();
cache.addOrUpdate(1, 'Message 1')
console.log(cache.checkCache()) // Should have { '1': 'Message 1'}
var message1 = cache.getOrAdd(1);
console.log(message1) // Should be 'Message 1'
var exists2 = cache.exists(2)
console.log("Message 2 Exists?", exists2)
var message2 = cache.getOrAdd(2, "Message 2")
console.log(message2) // Should be '....'

// Test the FileStore class
var filestore = new FileStore( "./testfiles")
var fileInfo = filestore.getFileInfo(1)
console.log(fileInfo);
filestore.save(1, 'balllllls 1')
var fileMessage1 = filestore.read(1)
console.log(fileMessage1)
