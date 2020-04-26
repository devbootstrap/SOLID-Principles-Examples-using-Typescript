import IStore from './IStore'
import IStoreWriter from './IStoreWriter'
/**
 * A class that allows for messages to be stored in
 * a relational database such as Postgres or MySql
 */
export default class SqlStore implements IStore, IStoreWriter {
  save(id: number, message: string): void {
    // Write to database code would go here
  }
  read(id: number): string {
    // Read from database here
    return ''
  }
  /**
   * Note: We have removed the getFileInfo method definition
   * since its no longer part of the IStore interfave
  **/
}