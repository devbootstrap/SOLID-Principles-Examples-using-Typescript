export default interface IStore {
  save(id: number, message: string): void
  read(id: number): string
  getFileInfo(id: number): string
}