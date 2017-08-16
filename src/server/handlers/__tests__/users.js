const handlers = require('../users');
const { modelUser } = require('../../models');


jest.mock('../../models', () => ({
  modelUser: {
    create: jest.fn(data => Promise.resolve(data)),
    findAll: jest.fn(data => Promise.resolve(data)),
  },
}));

const mockParam = {
  name: 'Ivan',
  surname: 'Ivanov',
};


describe('Test createUser handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should calls modelUser.create with proper parameter', () =>
    handlers.createUser(mockParam).then(() =>
      expect(modelUser.create).toBeCalledWith({
        name: mockParam.name,
        surname: mockParam.surname,
      }),
    ),
  );
});

describe('Test getUsers handler', () => {
  it('should calls modelUser.findAll with proper parameter', () =>
    handlers.getUsers(mockParam).then(() =>
      expect(modelUser.findAll).toBeCalled(),
    ),
  );
});
