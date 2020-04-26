import StoreLogger from './StoreLogger'

export default class StoreCache {
  cache: any;
  logger: StoreLogger;

  constructor(_logger: StoreLogger) {
    this.cache = {}
    this.logger = _logger
  }

  public addOrUpdate(id: number, message: string): void {
    this.cache[id] = message;
  }

  public getOrAdd(id: number, fnStoreRead: any) {
    this.logger.readingCache(id)
    if(!this.exists(id)) {
      // The message does not exist in the cache
      this.logger.missingFromCache(id);
      // Load the contents from the store using the passed in function
      var message = fnStoreRead()
      // Save the message to the cache
      this.addOrUpdate(id, message);
    }
    return this.cache[id];
  }

  public exists?(id: number): boolean {
    return this.cache.hasOwnProperty(id);
  }
}