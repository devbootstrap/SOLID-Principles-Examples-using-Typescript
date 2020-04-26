import IStoreLogger from "./IStoreLogger"
import IStoreWriter from "./IStoreWriter"

export default class StoreLogger implements IStoreLogger, IStoreWriter {
  writer: IStoreWriter

  constructor(_writer: IStoreWriter){
    this.writer = _writer;
  }
  public save(id: number, message: string): void {
    this.saving(id);
    this.writer.save(id, message);
    this.saved(id);
  }

  public saving(id: number): void {
    console.log(`Saving message ${id}.`)
  }

  public saved(id: number): void {
    console.info(`Saved message ${id}.`)
  }

  public readingFilestore(id: number): void {
    console.debug(`Reading message ${id} from FileStore.`)
  }

  public readingCache(id: number): void {
    console.debug(`Reading message ${id} from StoreCache.`)
  }

  public didNotFind(id: number): void {
    console.debug(`No message ${id} found.`)
  }

  public missingFromCache(id: number): void {
    console.debug(`Message ${id} missing from cache.`)
  }

  public returning(id: number): void {
    console.debug(`Returning message ${id}.`)
  }

  public errorSaving(id: number): void {
    console.error(`Error saving message ${id}.`)
  }
}