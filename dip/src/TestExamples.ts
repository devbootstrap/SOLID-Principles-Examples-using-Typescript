import MessageStore from './MessageStore';
import FileStore from "./FileStore";
import StoreCache from "./StoreCache";
import StoreLogger from "./StoreLogger";

import fs from 'fs';
import path from 'path'

var dirtest = "./testfiles";
var dirpath = path.join(__dirname,  dirtest)
if(!fs.existsSync(dirpath)){
  fs.mkdirSync(dirpath)
}

// 'Compose' our objects ....
var fileStore = new FileStore(dirtest);
var cache = new StoreCache(fileStore, fileStore);
var logger = new StoreLogger(cache, cache);
var messagestore = new MessageStore(logger, logger)

// Test the CustomMessageStore class
console.log("** Test the CustomMessageStore class **")
console.log()

messagestore.save(99, 'Message 99 saved via MessageStore class')
var fileMessage99 = messagestore.read(99)
console.log(fileMessage99)
var fileMessage33 = messagestore.read(33)
console.log(fileMessage33)
messagestore.save(33, 'Message 33 saved via MessageStore class')
console.log()