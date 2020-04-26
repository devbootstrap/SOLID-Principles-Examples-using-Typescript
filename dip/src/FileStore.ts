import fs from 'fs';
import path from 'path';
import IFileLocator from './IFileLocator';
import IStoreWriter from './IStoreWriter';
import IStoreReader from './IStoreReader';

/**
 * A class that allows for messages to be stored in
 * a local file system
 */
export default class FileStore implements IStoreReader, IStoreWriter, IFileLocator {
  directory: string

  constructor(_directory: string) {
    this.directory = _directory;
  }

  public save(id: number, message: string): void {
    var fileFullName = this.getFileInfo(id);
    fs.writeFileSync(fileFullName, message)
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