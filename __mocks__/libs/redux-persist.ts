jest.mock('redux-persist', () => ({
  persistStore: jest.fn().mockReturnValue({}),
  persistReducer: jest.requireActual('redux-persist').persistReducer,
}));
