export default class StoreLogger {
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
    console.debug(`Error saving message ${id}.`)
  }
}