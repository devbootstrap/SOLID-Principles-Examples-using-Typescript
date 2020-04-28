import StoreLogger from '../../src/StoreLogger'
import mockstore from './mockstore'

describe('StoreLogger', () => {
  var logger: StoreLogger;
  var consolelog = console.log;
  var consoleinfo = console.info;
  var consoledebug = console.debug;
  var consoleerror = console.error;
  beforeEach(()=> {
    // mock console.log calls since we are testing this
    console.log = jest.fn();
    console.info = jest.fn();
    console.debug = jest.fn();
    console.error = jest.fn();
    logger = new StoreLogger(mockstore, mockstore);
  })
  afterEach(() => {
    console.log = consolelog;
    console.info = consoleinfo;
    console.debug = consoledebug;
    console.error = consoleerror;
  })
  describe('IStoreReader', () => {
    beforeEach(()=> {
      logger.reading = jest.fn()
      logger.returning = jest.fn()
      logger.didNotFind = jest.fn()
    })
    describe('when message is found', () => {
      it('reads, logs and returns the message', () => {
        expect(logger.read(1)).toBe('Message')
        expect(logger.reading).toHaveBeenCalledWith(1)
        expect(logger.returning).toHaveBeenCalledWith(1)
        expect(mockstore.read).toHaveBeenCalledWith(1)
      })
    })
    describe('when message is NOT found', () => {
      it('logs did not find on the logger', () => {
        mockstore.read = jest.fn((id: number) => undefined)
        expect(logger.read(1)).toBe(undefined)
        expect(mockstore.read).toHaveBeenCalledWith(1)
        expect(logger.didNotFind).toHaveBeenCalledWith(1)
      })
    })
  })
  describe('IStoreWriter', () => {
    beforeEach(()=> {
      logger.saving = jest.fn()
      logger.saved = jest.fn()
      logger.errorSaving = jest.fn()
    })
    describe('when message is written sucessfully', () => {
      it('persists the message via the store and logs success', () => {
        var msg = 'A new message to save'
        logger.save(1, msg)
        expect(mockstore.save).toHaveBeenCalledWith(1, msg)
        expect(logger.saving).toHaveBeenCalledWith(1)
        expect(logger.saved).toHaveBeenCalledWith(1)
      })
    })
    describe('when call to writer save throws a new Error', () => {
      it('logs an error saving', () => {
        mockstore.save = jest.fn((id: number, message: string) => {throw new Error('test')})
        logger.save(1, 'setup to fail!')
        expect(mockstore.save).toThrowError('test')
        expect(logger.errorSaving).toHaveBeenCalledWith(1)
      })
    })
  })
  describe('saving', () => {
    it('logs a saving message via console.log', () => {
      logger.saving(1);
      expect(console.log).toHaveBeenCalledWith('Saving message 1.');
    })
  })
  describe('saved', () => {
    it('logs a saved message via console.info', () => {
      logger.saved(1)
      expect(console.info).toHaveBeenCalledWith('Saved message 1.')
    })
  })
  describe('reading', () => {
    it('logs a reading message via console.debug', () => {
      logger.reading(1)
      expect(console.debug).toHaveBeenCalledWith('Reading message 1.')
    })
  })
  describe('didNotFind', () => {
    it('logs a didNotFind message via console.debug', () => {
      logger.didNotFind(1)
      expect(console.debug).toHaveBeenCalledWith('No message 1 found.')
    })
  })
  describe('missingFromCache', () => {
    it('logs a missingFromCache message via console.debug', () => {
      logger.missingFromCache(1)
      expect(console.debug).toHaveBeenCalledWith('Message 1 missing from cache.')
    })
  })
  describe('returning', () => {
    it('logs a returning message via console.debug', () => {
      logger.returning(1)
      expect(console.debug).toHaveBeenCalledWith('Returning message 1.')
    })
  })
  describe('errorSaving', () => {
    it('logs a errorSaving message via console.debug', () => {
      logger.errorSaving(1)
      expect(console.error).toHaveBeenCalledWith('Error saving message 1.')
    })
  })
})
