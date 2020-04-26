export default interface IStoreCache {
  save(id: number, message: string): void
  getOrAdd(id: number, fnStoreRead: Function): string
}