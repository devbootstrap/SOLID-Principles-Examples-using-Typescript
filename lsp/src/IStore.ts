export default interface IStore {
  save(id: number, message: string): Promise<any>
  read(id: number): string
  getFileInfo(id: number): string
}