const usersRouter = require('../users').router;
const handlers = require('../../handlers/users');
const app = require('../../app');
const callbacks = require('../users').callbacks


const mockUser = {
  name: 'Ivan',
  surname: 'Ivanov',
};

jest.mock('../../handlers/users', () => ({
  createUser: jest.fn(),
  getUsers: jest.fn(),
  getTransactionsOfUser: jest.fn(),
}));

jest.mock('../../app', () => ({
  post: jest.fn(),
  get: jest.fn(),
}));

const req = {
  body: 'test',
};

const res = {
  sendStatus: jest.fn(),
  json: jest.fn(),
};

const usersRouter = {
  get: jest.fn((route, callback) => {
    callback(req, res);
  }),
  post: jest.fn((route, callback) => {
    callback(req, res);
  }),
};

callbacks['/get'] = jest.fn((route, callback) => {
    callback(req, res);
}),

// usersRouter.post = jest.fn((route, callback) => {
//   callback(req, res);
// });

describe('Test post /', () => {
  it('should calls handlers.createUser function', () => {
    usersRouter.post('/', callback);
    expect(handlers.createUser).toBeCalled();
  });
});

// describe('Test post /users', () => {
//   app.post = jest.fn((route, callback) => {
//     callback(req, res);
//   });

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should calls post method with first argument "/users" and second any function', () => {
//     users(app);
//     expect(app.post).toHaveBeenCalledWith('/users', expect.any(Function));
//   });

//   it('should calls handlers.createUser with req.body parameter', () => {
//     users(app);
//     expect(handlers.createUser).toHaveBeenCalledWith(req.body);
//   });

//   it('json method of res param should be called with mockUser', () => {
//     handlers.createUser.mockImplementationOnce(() => mockUser);
//     users(app);
//     expect(res.json).toBeCalled();
//     expect(res.json).toHaveBeenCalledWith(mockUser);
//   });

//   it('should calls sendStatus with 400 and should not calls json method of res when transaction value is null', () => {
//     handlers.createUser.mockImplementationOnce(() => null);
//     users(app);
//     expect(res.json).not.toBeCalled();
//     expect(res.sendStatus).toHaveBeenCalledWith(400);
//   });

//   it('should calls sendStatus with 500 and should not calls json method of res with undefined', () => {
//     handlers.createUser.mockImplementationOnce(() => undefined);
//     users(app);
//     expect(res.json).not.toBeCalled();
//     expect(res.sendStatus).toHaveBeenCalledWith(500);
//   });
// });

// describe('Test get /users', () => {
//   app.get = jest.fn((route, callback) => {
//     callback(req, res);
//   });

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should calls get method with first argument "/users" and second any function', () => {
//     users(app);
//     expect(app.get).toHaveBeenCalledWith('/users', expect.any(Function));
//   });

//   it('should calls handlers.getUsers', () => {
//     users(app);
//     expect(handlers.getUsers).toBeCalled();
//   });

//   it('json method of res param should be called with correct user value', () => {
//     handlers.getUsers.mockImplementationOnce(() => [mockUser]);
//     users(app);
//     expect(res.json).toBeCalled();
//     expect(res.json).toHaveBeenCalledWith([mockUser]);
//   });

//   it('should calls sendStatus with 500 and should not calls json method of res when transaction value incorrect', () => {
//     handlers.getUsers.mockImplementationOnce(() => undefined);
//     users(app);
//     expect(res.json).not.toBeCalled();
//     expect(res.sendStatus).toHaveBeenCalledWith(500);
//   });
// });
