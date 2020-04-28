import StoreCache from '../../src/StoreCache'
import mockstore from './mockstore'

describe('StoreCache', () => {
  var cache: StoreCache;
  var id: number
  var msg: string

  beforeEach(() => {
    cache = new StoreCache(mockstore, mockstore)
    id = 1
    msg = 'a message in the cache'
    cache.cache[id] = msg;
  })

  describe('exists?', () => {
    it('returns true when the message id exists', () => {
      expect(cache.cache[id]).toBe(msg) // sanity check
      // note exists? is a private method so the call
      // to the method is made via array access
      expect(cache["exists"](id)).toBeTruthy()
    })
  })
  describe('addOrUpdate', () => {
    describe('adding a new message', () => {
      it('should add a new message to the cache', () => {
        var newmsg = 'a new message'
        expect(cache["exists"](2)).toBeFalsy()
        cache["addOrUpdate"](2, newmsg)
        expect(cache["exists"](2)).toBeTruthy()
        expect(cache.cache[2]).toBe(newmsg)
      })
    })
    describe('updating an existing message', () => {
      it('should update the message with the id to new message', () => {
        var newmsg = 'a new message'
        expect(cache.cache[1]).toBe(msg) // the old message
        cache["addOrUpdate"](1, newmsg)
        expect(cache.cache[1]).toBe(newmsg)
      })
    })
  })
  describe('IStoreReader', () => {
    describe('when existing message is read', () => {
      it('returns the message string', () => {
        expect(cache.read(id)).toBe(msg)
      })
    })
    describe('when message is read that does not exist in the cache', () => {
      it('reads the message from the underlying store, updates the cache and returns that value', () => {
        var newmsg = 'a new message from store'
        // confirm that message id 2 does not yet exist in the store
        expect(cache["exists"](2)).toBeFalsy()
        // mock the underlying store read method to return a set message string
        mockstore.read = jest.fn((id: number) => newmsg)
        // expect the cache read to return the new message string
        expect(cache.read(2)).toBe(newmsg)
        // expect the cache to now contain a message for id 2
        expect(cache['exists'](2)).toBeTruthy()
      })
      describe('and when the message also does not exist in the underlying store', () => {
        it('will return undefined and not update the cache', () => {
          mockstore.read = jest.fn((id: number) => undefined)
          expect(cache.read(2)).toBeUndefined()
          expect(cache["exists"](2)).toBeFalsy()
          expect(cache.cache[2]).toBeUndefined()
        })
      })
    })
  })
  describe('IStoreWriter', () => {
    beforeEach(()=> {
      cache["addOrUpdate"] = jest.fn()
    })
    describe('when message is saved', () => {
      it('saves to the cache and the underlying store', () => {
        cache.save(id, msg)
        expect(mockstore.save).toHaveBeenCalledWith(id, msg)
        expect(cache["addOrUpdate"]).toHaveBeenCalledWith(1, msg)
      })
    })
  })
})