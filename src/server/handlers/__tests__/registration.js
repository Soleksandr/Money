const bcrypt = require('bcrypt');
const handlers = require('../registration');
const { modelUser } = require('../../models');


jest.mock('../../models', () => ({
  modelUser: {
    create: jest.fn(() => Promise.resolve({
      get: jest.fn(),
    })),
  },
}));


jest.mock('bcrypt', () => ({
  hash: jest.fn(() => Promise.resolve('password')),
}));

const mockParam = {
  username: 'ivan',
  name: 'Ivan',
  surname: 'Ivanov',
  password: 'ivan',
};


describe('Test createUser handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should calls bcrypt.hash with proper arguments', () =>
    handlers.createUser(mockParam).then(() =>
      expect(bcrypt.hash).toBeCalledWith(mockParam.password, expect.any(Number)),
    ),
  );

  it('should calls modelUser.create with proper arguments', () =>
    handlers.createUser(mockParam).then(() =>
      expect(modelUser.create).toBeCalledWith({
        username: mockParam.username,
        name: mockParam.name,
        surname: mockParam.surname,
        password: 'password',
      }),
    ),
  );
});
