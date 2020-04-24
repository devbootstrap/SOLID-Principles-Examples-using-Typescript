import { promises as fsp } from 'fs';
import fs from 'fs';
import path from 'path'

class FileStore {
  directory: string;
  cache: any;

  constructor(public _directory: string) {
    this.directory = _directory;
    this.cache = {};
  }

  public async save (id: number, message: string) {
    console.log("Saving message:", id);
    var fileFullName = this.getFileInfo(id)
    await fsp.writeFile(fileFullName, message).then(() => {
      this.cache[id] = message;
      console.log("Message saved:", id);
    }).catch((err: any) => console.error('There was an error: ', err))
  }

  public read(id: number): string {
    console.log("Reading message:", id)
    var fileFullName = this.getFileInfo(id);
    var exists = fs.existsSync(fileFullName);
    console.log("File exists: ", exists)
    if(!exists) {
      console.log(`No message ${id} found`)
      return ''
    }
    // We want to get from the cache or add it to the cache
    if(!this.cache.hasOwnProperty(id)) {
      console.info(`Message id ${id} not in cache`);
      var data = fs.readFileSync(fileFullName, {encoding: 'ASCII'});
      this.cache[id] = data;
    }
    var message = this.cache[id]
    console.log(`Returning message ${id}`)
    return message;
  }

  public getFileInfo(id: number) {
    return path.join(__dirname, this.directory, `${id}.txt`)
  }

  public checkCache() {
    return this.cache;
  }
}

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

