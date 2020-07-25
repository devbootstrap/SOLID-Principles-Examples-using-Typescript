import FileStore from '../../src/FileStore';
import { tmpdir } from 'os'
import { readFileSync, writeFileSync } from 'fs'

describe('FileStore', () => {
  var filestore: FileStore
  var directory: string
  describe('IFileLocator', () => {
    describe('getFileInfo', () => {
      it('should return the full path of the message file by id', () => {
        directory = 'teststore';
        var id = 1;
        filestore = new FileStore(directory)
        var expectedPath = (__dirname + '/' + directory + `/${id}.txt`).replace('tests/', '')
        expect(filestore.getFileInfo(id)).toBe(expectedPath);
      })
    })
  })
  describe('IStoreWriter', () => {
    describe('save', () => {
      it('should save the message to a file called id.txt', () => {
        var id = 1
        var msg = 'A new message'
        filestore.getFileInfo = jest.fn((id: number): string => { return tmpdir() + `/${id}.txt` } )
        filestore.save(id, msg)
        expect(readFileSync(tmpdir() + `/${id}.txt`, {encoding: 'ASCII'})).toBe(msg);
      })
    })
  })
  describe('IStoreReader', () => {
    describe('read', () => {
      describe('when the file does not exist', () => {
        it('should return undefined', () => {
          expect(filestore.read(99)).toBeUndefined()
        })
      })
      describe('when the file exists', () => {
        it('should read the message from the file given an id', () => {
          var msg = 'a new file to read'
          var id = 3
          filestore.getFileInfo = jest.fn((id: number): string => { return tmpdir() + `/${id}.txt` } )
          writeFileSync(tmpdir() + `/${id}.txt`, msg);
          expect(filestore.read(id)).toBe(msg);
        })
      })
    })
  })
})