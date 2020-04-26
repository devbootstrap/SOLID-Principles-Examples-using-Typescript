export default interface IStoreCache {
  save(id: number, message: string): void
  read(id: number): string
}