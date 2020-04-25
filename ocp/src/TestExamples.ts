import CustomMessageStore from './CustomMessageStore';

var directory = "./testfiles";

(async () => {
  // Test the CustomMessageStore class
  console.log("** Test the CustomMessageStore class **")
  console.log()
  var messagestore = new CustomMessageStore(directory);
  await messagestore.save(99, 'Message 99 saved via MessageStore class')
  var fileMessage99 = messagestore.read(99)
  console.log(fileMessage99)
  console.log()
})();