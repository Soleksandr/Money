const users = require('../users');
const handlers = require('../../handlers/users');

const mockUser = {
  name: 'Ivan',
  surname: 'Ivanov',
};

jest.mock('../../handlers/users', () => ({
  createUser: jest.fn(),
  getUsers: jest.fn(),
  getTransactionsOfUser: jest.fn(),
}));

const req = {
  body: 'test',
};

const res = {
  sendStatus: jest.fn(),
  json: jest.fn(),
};

const mockApp = {
  post: jest.fn((route, callback) => {
    callback(req, res);
  }),
  get: jest.fn((route, callback) => {
    callback(req, res);
  }),
};


describe('Test post /users', () => {
  beforeEach(() => {
    mockApp.get.mockImplementationOnce(() => null);
    jest.clearAllMocks();
  });

  it('should calls post method with first argument "/users" and second any function', () => {
    users(mockApp);
    expect(mockApp.post).toHaveBeenCalledWith('/users', expect.any(Function));
  });

  it('should calls handlers.createUser with req.body parameter', () => {
    users(mockApp);
    expect(handlers.createUser).toHaveBeenCalledWith(req.body);
  });

  it('json method of res param should be called with mockUser', () => {
    handlers.createUser.mockImplementationOnce(() => mockUser);
    users(mockApp);
    expect(res.json).toBeCalled();
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it('should calls sendStatus with 400 and should not calls json method of res when transaction value is null', () => {
    handlers.createUser.mockImplementationOnce(() => null);
    users(mockApp);
    expect(res.json).not.toBeCalled();
    expect(res.sendStatus).toHaveBeenCalledWith(400);
  });

  it('should calls sendStatus with 500 and should not calls json method of res with undefined', () => {
    handlers.createUser.mockImplementationOnce(() => undefined);
    users(mockApp);
    expect(res.json).not.toBeCalled();
    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});

describe('Test get /users', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockApp.post.mockImplementationOnce(() => null);
  });

  it('should calls get method with first argument "/users" and second any function', () => {
    users(mockApp);
    expect(mockApp.get).toHaveBeenCalledWith('/users', expect.any(Function));
  });

  it('should calls handlers.getUsers', () => {
    users(mockApp);
    expect(handlers.getUsers).toBeCalled();
  });

  it('json method of res param should be called with correct user value', () => {
    handlers.getUsers.mockImplementationOnce(() => [mockUser]);
    users(mockApp);
    expect(res.json).toBeCalled();
    expect(res.json).toHaveBeenCalledWith([mockUser]);
  });

  it('should calls sendStatus with 500 and should not calls json method of res when transaction value incorrect', () => {
    handlers.getUsers.mockImplementationOnce(() => undefined);
    users(mockApp);
    expect(res.json).not.toBeCalled();
    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});
