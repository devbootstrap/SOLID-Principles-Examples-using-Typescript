import IStoreWriter from "./IStoreWriter";
import IStoreReader from "./IStoreReader";

export default class MessageStore {
  writer: IStoreWriter;
  reader: IStoreReader;

  constructor(writer: IStoreWriter,reader: IStoreReader) {
    if(writer === null) {
      throw new Error("writer argument cannot be null")
    }
    if(reader === null) {
      throw new Error("reader argument cannot be null")
    }
    this.writer = writer;
    this.reader = reader;
  }

  /**
   *
   * @param id the id of the message to save
   * @param message the text message to write to storage
   *
   */
  public save (id: number, message: string) {
    this.writer.save(id, message);
  }

   /**
   *
   * @param id the id of the message to read
   * @returns message string
   *
   */
  public read(id: number): string {
    return this.reader.read(id);
  }
}