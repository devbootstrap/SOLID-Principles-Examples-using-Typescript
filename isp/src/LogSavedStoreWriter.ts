import IStoreWriter from "./IStoreWriter"

/**
 * Example of how we can extract the logging method
 * to a new class so that we can implement a common
 * interface for IStoreWriter.
 *
 * NOTE: this is NOT a good solution in the long term
 * since it breaks the OCP. So we will not use this
 * its just here to show you that we can break the class
 * into these smaller classes in order to implement
 * a common interface.
 */
export default class LogSavedStoreWriter implements IStoreWriter {
  public save(id: number): void {
    console.info(`Saved message ${id}.`)
  }
}