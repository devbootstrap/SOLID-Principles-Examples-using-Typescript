export default interface IStoreWriter {
  save(id: number, message: string): void
}