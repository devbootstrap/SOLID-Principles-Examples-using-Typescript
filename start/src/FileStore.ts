import { promises as fsp } from 'fs';
import fs from 'fs';
import path from 'path'

export default class FileStore {
  directory: string;
  cache: any;

  /**
   *
   * @param _directory the directory where to save the file to
   *
   * This is the constructor of the FileStore Class
   * It sets the directory to use for saving the file
   * and also resets the cache object
   */
  constructor(public _directory: string) {
    this.directory = _directory;
    this.cache = {};
  }

  /**
   *
   * @param id the id of the file to save
   * @param message the text message to write to the file
   *
   * Function writes the file to disk using the id as part
   * of the filename. The id is a number and the file name is
   * formed as a .txt file using the pattern id.txt. Its saved
   * in the relative directory as set in the constructor.
   */
  public async save (id: number, message: string) {
    console.log("Saving message:", id);
    var fileFullName = this.getFileInfo(id)
    await fsp.writeFile(fileFullName, message).then(() => {
      this.cache[id] = message;
      console.log("Message saved:", id);
    }).catch((err: any) => console.error('There was an error: ', err))
  }

  /**
   *
   * @param id the id of the file to read
   *
   * Function checks if the file exists and
   * if not returns an empty string.
   * If the file does exist then the function
   * checks if the file id is in the cache and
   * if not will read the contents of the file
   * from disk and add to the cache.
   *
   * @returns message string
   */
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

  // Public getter to check the state of the cache during testing
  public checkCache() {
    return this.cache;
  }

  // Private method to prepare the full file info
  private getFileInfo(id: number): string {
    return path.join(__dirname, this.directory, `${id}.txt`)
  }
}