import StoreCache from '../../src/StoreCache'
import mockstore from './mockstore'
import { exec } from 'child_process';

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
      expect(cache.cache[id]).toBe(msg);
      expect(cache["exists"](id)).toBeTruthy();
    })
  })

  describe('addOrUpdate', () => {
    describe('adding a new message', () => {
      it('should add a new message to the cache', () => {
        var newmsg = 'a new message';
        expect(cache["exists"](2)).toBeFalsy()
        cache["addOrUpdate"](2, newmsg)
        expect(cache["exists"](2)).toBeTruthy()
        expect(cache.cache[2]).toBe(newmsg)
      })
    })
    describe('updating an existing message', () => {
      it('should update the message with the id to the new message text', ()=> {
        var updatedMessage = 'an updated message string'
        expect(cache.cache[1]).toBe(msg) // the old message
        cache["addOrUpdate"](1, updatedMessage)
        expect(cache.cache[1]).toBe(updatedMessage)
      })
    })
  })
  describe('IStoreReader', () => {
    describe('when existing message is read', () => {
      it('should return the message string', () => {
        expect(cache.read(id)).toBe(msg)
      })
    })
    describe('when message is read that does not exist in the cache', () => {
      it('read the message form the underlying store, update the cache and return that value', () => {
        var newmsg = 'a new message from store'
        expect(cache['exists'](2)).toBeFalsy()
        mockstore.read = jest.fn((id: number) => newmsg)
        expect(cache.read(2)).toBe(newmsg)
      })
    })
    describe('when the message does not existing in the underlying store', () => {
      it('will return undefined and not update the cache', () => {
        mockstore.read = jest.fn((id: number) => undefined)
        expect(cache.read(2)).toBeUndefined()
      })
    })
  })
  describe('IStoreWrite', () => {
    beforeEach(() => {
      cache["addOrUpdate"] = jest.fn()
    })

    describe('when a message is saved', () => {
      it('saves to the cache and the underlying store', () => {
        cache.save(id, msg)
        expect(mockstore.save).toHaveBeenCalledWith(id, msg)
        expect(cache["addOrUpdate"]).toHaveBeenCalledWith(id, msg)
      })
    })
  })
})