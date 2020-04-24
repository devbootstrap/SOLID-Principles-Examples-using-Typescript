import StoreLogger from './StoreLogger'

export default class StoreCache {
  cache: any;
  logger: StoreLogger;

  constructor() {
    this.cache = {}
    this.logger = new StoreLogger();
  }

  public addOrUpdate(id: number, message: string): void {
    this.cache[id] = message;
  }

  public getOrAdd(id: number, message?: string): string {
    if(!this.exists(id)) {
      if(message===undefined) {
        throw new Error("Message expected when file does not exist");
      }
      this.logger.missingFromCache(id);
      // Save the file contents to the cache
      this.addOrUpdate(id, message);
    }
    return this.cache[id];
  }

  public exists?(id: number): boolean {
    return this.cache.hasOwnProperty(id);
  }

  public checkCache(): object {
    return this.cache;
  }
}