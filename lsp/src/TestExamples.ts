import MessageStore from './MessageStore';

var directory = "./testfiles";

(async () => {
  // Test the CustomMessageStore class
  console.log("** Test the CustomMessageStore class **")
  console.log()

  var messagestore = new MessageStore(directory);

  await messagestore.save(99, 'Message 99 saved via MessageStore class')
  var fileMessage99 = messagestore.read(99)
  console.log(fileMessage99)
  var fileMessage33 = messagestore.read(33)
  console.log(fileMessage33)
  await messagestore.save(33, 'Message 33 saved via MessageStore class')
  console.log()
})();