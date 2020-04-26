export default interface IStoreLogger {
  // Note we add the message to the saving and saved methods
  saving(id: number, message: string): void
  saved(id: number, message: string): void
  readingFilestore(id: number): void
  readingCache(id: number): void
  didNotFind(id: number): void
  missingFromCache(id: number): void
  returning(id: number): void
  errorSaving(id: number): void
}