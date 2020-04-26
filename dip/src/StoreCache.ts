import StoreLogger from './StoreLogger'
import IStoreCache from './IStoreCache'
import IStoreLogger from './IStoreLogger';
import IStoreWriter from './IStoreWriter';

export default class StoreCache implements IStoreCache, IStoreWriter {
  cache: any;
  writer: IStoreWriter;

  constructor(_writer: IStoreWriter) {
    this.cache = {}
    this.writer = _writer
  }

  public save(id: number, message: string): void {
    this.writer.save(id, message)
    this.cache[id] = message;
  }

  public getOrAdd(id: number, fnStoreRead: Function) {
    if(!this.exists(id)) {
      // The message does not exist in the cache
      // Load the contents from the store using the passed in function
      var message = fnStoreRead()
      // Save the message to the cache
      this.save(id, message);
    }
    return this.cache[id];
  }

  public exists?(id: number): boolean {
    return this.cache.hasOwnProperty(id);
  }
}