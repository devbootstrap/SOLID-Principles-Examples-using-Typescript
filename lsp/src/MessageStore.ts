import FileStore from "./FileStore";
import StoreCache from "./StoreCache";
import StoreLogger from "./StoreLogger";

export default class MessageStore {
  store : FileStore;
  cache: StoreCache;
  logger: StoreLogger;

  constructor(directory: string) {
    this.logger = new StoreLogger();
    this.store = new FileStore(directory, this.Logger);
    this.cache = new StoreCache(this.Logger);
  }

  /**
   * A getter that returns an instance of logger
   * Purpose of this is to be able to extend this class
   * and use a different type of logger (that inherits from StoreLogger)
   */
  get Logger() {
    return this.logger;
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
  public async save (id: number, message: string) {
    await this.store.save(id, message);
    this.cache.addOrUpdate(id, message);
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
    var message = this.cache.getOrAdd(
      id, () => this.store.read(id))
    return message
  }
}