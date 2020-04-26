import fs from 'fs';
import path from 'path';
import IStore from './IStore';
import IFileLocator from './IFileLocator';
import IStoreWriter from './IStoreWriter';

/**
 * A class that allows for messages to be stored in
 * a local file system
 *
 * Note this class implements the IStore interface
 * and now also the IFileLocator interface
 */
export default class FileStore implements IStore, IStoreWriter, IFileLocator {
  directory: string

  constructor(_directory: string) {
    this.directory = _directory;
  }

  public save(id: number, message: string): void {
    var fileFullName = this.getFileInfo(id);
    try {
      fs.writeFileSync(fileFullName, message)
    } catch (err) {
      // this.logger.errorSaving(id);
    }
  }

  public read(id: number): string {
    var fileFullName = this.getFileInfo(id);
    var exists = fs.existsSync(fileFullName);
    if(!exists) {
      return undefined
    }
    return fs.readFileSync(fileFullName, {encoding: 'ASCII'});
  }

  public getFileInfo(id: number): string {
    return path.join(__dirname, this.directory, `${id}.txt`)
  }
}