import fs from 'fs';
import path from 'path'
import StoreLogger from './StoreLogger'
import IStore from './IStore'

/**
 * A class that allows for messages to be stored in
 * a local file system
 *
 * Note this class implements the IStore interface
 */
export default class FileStore implements IStore {
  directory: string
  logger: StoreLogger

  constructor(_directory: string, _logger: StoreLogger) {
    this.directory = _directory;
    this.logger = _logger;
  }

  public save(id: number, message: string): void {
    this.logger.saving(id);
    var fileFullName = this.getFileInfo(id);
    try {
      fs.writeFileSync(fileFullName, message)
    } catch (err) {
      this.logger.errorSaving(id);
    }
    this.logger.saved(id)
  }

  public read(id: number): string {
    this.logger.readingFilestore(id)
    var fileFullName = this.getFileInfo(id);
    var exists = fs.existsSync(fileFullName);
    if(!exists) {
      this.logger.didNotFind(id);
      return undefined
    }
    return fs.readFileSync(fileFullName, {encoding: 'ASCII'});
  }

  public getFileInfo(id: number): string {
    return path.join(__dirname, this.directory, `${id}.txt`)
  }
}