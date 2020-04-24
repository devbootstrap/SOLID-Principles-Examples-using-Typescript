import { promises as fsp } from 'fs';
import fs from 'fs';
import path from 'path'
import StoreLogger from './StoreLogger'

export default class FileStore {
  directory: string
  logger: StoreLogger

  constructor(_directory: string) {
    this.directory = _directory;
    this.logger = new StoreLogger()
  }

  public async save(id: number, message: string): Promise<any> {
    this.logger.saving(1)
    var fileFullName = this.getFileInfo(id)
    await fsp.writeFile(fileFullName, message)
      .then(() => this.logger.saved(id))
      .catch((err: any) => this.logger.errorSaving(id))
  }

  public read(id: number): string {
    var fileFullName = this.getFileInfo(id);
    var exists = fs.existsSync(fileFullName);
    if(exists) {
      var data = fs.readFileSync(fileFullName, {encoding: 'ASCII'});
      return data;
    } else {
      this.logger.didNotFind(id);
      return ''
    }
  }

  public getFileInfo(id: number) {
    return path.join(__dirname, this.directory, `${id}.txt`)
  }
}