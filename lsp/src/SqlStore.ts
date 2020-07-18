import IStore from './IStore'
// Note since deriving the SqlStore as simply an
// extenstion of FileStore does not make sense
// we instead create an interface IStore and use that
// class SqlStore extends FileStore <- this does not make sense

/**
 * A class that allows for messages to be stored in
 * a relational database such as Postgres or MySql
 *
 * Note this class implements the IStore interface
 * Note also this is just for demo purpose only!
 */
export default class SqlStore implements IStore {
  save(id: number, message: string): void {
    // Write to database code would go here
  }
  read(id: number): string {
    // Read from database here
    return ''
  }

  /**
   * Note that we need to throw 'Method not implemented' here
   * because in the context of the SqlStore the 'getFileInfo'
   * method is not required.
   *
   * Note: THIS BREAKS LSP!! We will discuss a solution to this later.
   */
  getFileInfo(id: number): string {
    throw new Error("Method not implemented.");
  }
}