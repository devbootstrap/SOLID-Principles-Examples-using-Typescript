var mockstore;

// mockstore needs to be the same shape as
// the IStoreWriter and IStoreReader
export default mockstore = {
  read: jest.fn((id: number) => 'Message'),
  save: jest.fn((id: number, message: string) => {})
};