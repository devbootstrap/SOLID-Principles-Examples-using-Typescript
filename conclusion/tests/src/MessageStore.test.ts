import MessageStore from '../../src/MessageStore'
import mockstore from './mockstore'

describe('MessageStore', () => {
  var messagestore: MessageStore
  beforeEach(() => {
    messagestore = new MessageStore(mockstore, mockstore)
  })
  describe('constructor', () => {
    it('should throw and error if called with null params', () => {
      expect(() => {new MessageStore(null, mockstore)}).toThrowError("writer argument cannot be null");
      expect(() => {new MessageStore(mockstore, null)}).toThrowError("reader argument cannot be null");
    })
  })
  describe('IStoreReader', () => {
    describe('read', () => {
      it('should call the underlying reader', () => {
        messagestore.read(1)
        expect(mockstore.read).toHaveBeenCalledWith(1)
      })
    })
  })
  describe('IStoreWriter', () => {
    describe('save', () => {
      it('should call the underlying writer', () => {
        messagestore.save(1, 'message')
        expect(mockstore.save).toHaveBeenCalledWith(1, 'message')
      })
    })
  })
})