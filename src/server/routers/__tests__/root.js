const rootRouter = require('../root');
const handlers = require('../../handlers/root');

const mockUser = {
  username: 'ivan',
  name: 'Ivan',
  surname: 'Ivanov',
  id: 1,
};

const mockRequest = {
  user: mockUser,
};
const mockResponse = {
  json: jest.fn(),
};

jest.mock('../../handlers/root', () => ({
  getSessionUser: jest.fn(() => Promise.resolve(mockUser)),
}));

describe('Test root router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest.user = mockUser;
  });

  describe('getSessionUser function', () => {
    it('should calls handlers.getSessionUser with mockRequest.user if mockRequest.user define', () => {
      rootRouter.getSessionUser(mockRequest, mockResponse);
      expect(handlers.getSessionUser).toBeCalledWith(mockRequest.user.id);
    });

    it('should not calls handlers.getSessionUser with mockRequest.user if mockRequest.user not define', () => {
      mockRequest.user = null;
      rootRouter.getSessionUser(mockRequest, mockResponse);
      expect(handlers.getSessionUser).not.toBeCalled();
    });
  
    it('should calls mockResponse.json with proper argumet if mockRequest.user not define', () =>
      rootRouter.getSessionUser(mockRequest, mockResponse).then(() =>
        expect(mockResponse.json).toBeCalledWith(mockUser),
      ),
    );

    it('should calls mockResponse.json with proper argument if mockRequest.user is not define', () => {
      mockRequest.user = null;
      rootRouter.getSessionUser(mockRequest, mockResponse);
      expect(mockResponse.json).toBeCalledWith(null);
    });
  });
});
