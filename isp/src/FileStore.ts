import fs from 'fs';
import path from 'path'
import IStore from './IStore'
import IFileLocator from './IFileLocator';
import IStoreLogger from './IStoreLogger';
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
  logger: IStoreLogger

  constructor(_directory: string, _logger: IStoreLogger) {
    this.directory = _directory;
    this.logger = _logger;
  }

  public save(id: number, message: string): void {
    this.logger.saving(id, message);

    // Below is how we might use LogSavedStoreWriter
    // But we will not since it breaks OCP !! Because
    // the client cannot change the implentation of
    // the logger class if we use this approach.
    // NOTEL: A solution is in the next exercise (which is
    // to use composition instead of inheritance)

    // new LogSavingStoreWriter().save(id, message);

    var fileFullName = this.getFileInfo(id);
    try {
      fs.writeFileSync(fileFullName, message)
    } catch (err) {
      this.logger.errorSaving(id);
    }
    this.logger.saved(id, message);

    // Below is how we might use LogSavedStoreWriter
    // We don't use this for the same reasons as mentioned above

    // new LogSavedStoreWriter().save(id, message);
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