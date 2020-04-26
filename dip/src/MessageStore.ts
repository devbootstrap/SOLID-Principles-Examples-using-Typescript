import FileStore from "./FileStore";
import StoreCache from "./StoreCache";
import StoreLogger from "./StoreLogger";
import IStore from "./IStore";
import IStoreCache from "./IStoreCache";
import IStoreLogger from "./IStoreLogger";
import IStoreWriter from "./IStoreWriter";
import IStoreReader from "./IStoreReader";

export default class MessageStore {
  store : IStore;
  cache: IStoreCache;
  logger: IStoreLogger;
  writer: IStoreWriter;
  reader: IStoreReader;

  constructor(directory: string) {
    var fileStore = new FileStore(directory);
    // fileStore implements IStoreReader & IStoreWriter
    // so we pass that into the StoreCache as two params
    var cache = new StoreCache(fileStore, fileStore);
    var logger = new StoreLogger(cache, cache);
    this.cache = cache;
    this.store = fileStore;
    this.logger = logger;
    this.writer = logger;
    this.reader = logger;
  }

  /**
   * A getter that returns an instance of logger
   * Purpose of this is to be able to extend this class
   * and use a different type of logger (that inherits from StoreLogger)
   */
  get Logger(): IStoreLogger {
    return this.logger;
  }

  /**
   * A getter that returns an instance of store
   * Purpose of this is to be able to use a different type of store
   * that would implement the IStore interface
   */
  get Store(): IStore {
    return this.store;
  }

  /**
   * A getter that returns an instance of cache
   * Purpose of this is to be able to use a different type of cache
   * that would implement the IStore interface
   */
  get Cache(): IStoreCache {
    return this.cache;
  }

  /**
   * A getter that returns an instance of a writer composite
   * Purpose of this is to be able to use a different type of writer composite
   * that would implement the IStoreWriter interface
   */
  get Writer(): IStoreWriter {
    return this.writer;
  }

  /**
   * A getter that returns an instance of a writer composite
   * Purpose of this is to be able to use a different type of writer composite
   * that would implement the IStoreWriter interface
   */
  get Reader(): IStoreReader {
    return this.reader;
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
  public save (id: number, message: string) {
    this.Writer.save(id, message);
  }

   /**
   *
   * @param id the id of the message to read
   *
   * Function asks the cache to fetch the message
   * by id and passes an anonymous function that
   * fetches the message from the stoere
   * if the message is not in the cache.
   *
   * @returns message string
   */
  public read(id: number): string {
    return this.Reader.read(id);
  }
}