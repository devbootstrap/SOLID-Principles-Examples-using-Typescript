import FileStore from '../../src/FileStore';
import { readFileSync, writeFileSync  } from 'fs'
import { tmpdir } from 'os'
import IFileLocator from '../../src/IFileLocator';

describe('FileStore', () => {
  var filestore: FileStore
  var directory: string
  var msg: string
  var id: number
  beforeEach(() => {
    msg = 'a message to save to disk'
    id = 1
    directory = 'teststore'
    filestore = new FileStore(directory)
  })
  describe('IFileLocator', () => {
    describe('getFileInfo', () => {
      it('should return full path of the message file by id', () => {
        var expectedPath = (__dirname + '/' + directory + `/${id}.txt`).replace('tests/','')
        expect(filestore.getFileInfo(1)).toBe(expectedPath)
      })
    })
  })
  describe('reading and writing files', () => {
    var fullFileName: Function
    var getFileInfoOrig: any
    beforeEach(() => {
      getFileInfoOrig = filestore.getFileInfo
      fullFileName = (): string => { return tmpdir() + `/${id}.txt` }
      filestore.getFileInfo = jest.fn((id: number): string => { return fullFileName() })
    })
    describe('IStoreWriter', () => {
      describe('save', () => {
        it('should save the message to a file called id.txt', () => {
          filestore.save(id, msg)
          expect(readFileSync(fullFileName(), {encoding: 'ASCII'})).toBe(msg)
        })
      })
    })
    describe('IStoreReader', () => {
      describe('read', () => {
        describe('when the file does not exist', () => {
          it('returns undefined', () => {
            filestore.getFileInfo = getFileInfoOrig
            expect(filestore.read(99)).toBeUndefined()
          })
        })
        describe('when the file exists', () => {
          it('should read the message from file given an id', () => {
            msg = 'a new file to read'
            writeFileSync(fullFileName(), msg)
            expect(filestore.read(id)).toBe(msg)
          })
        })
      })
    })
  })
})