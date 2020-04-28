import IStoreWriter from "./IStoreWriter"
import IStoreReader from "./IStoreReader";

export default class StoreLogger implements IStoreWriter, IStoreReader {
  writer: IStoreWriter
  reader: IStoreReader

  constructor(_writer: IStoreWriter, _reader: IStoreReader){
    this.writer = _writer;
    this.reader = _reader;
  }

  public read(id: number): string {
    this.reading(id)
    var retValue = this.reader.read(id);
    if(retValue === undefined){
      this.didNotFind(id)
    } else {
      this.returning(id)
    }
    return retValue;
  }

  public save(id: number, message: string): void {
    this.saving(id);
    try {
      this.writer.save(id, message);
    } catch (err) {
      console.log(err)
      this.errorSaving(id)
    }
    this.saved(id);
  }

  public saving(id: number): void {
    console.log(`Saving message ${id}.`)
  }

  public saved(id: number): void {
    console.info(`Saved message ${id}.`)
  }

  public reading(id: number): void {
    console.debug(`Reading message ${id}.`)
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