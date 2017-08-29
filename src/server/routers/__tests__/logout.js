const logoutRouter = require('../logout');

const mockUser = {
  username: 'ivan',
  name: 'Ivan',
  surname: 'Ivanov',
  id: 1,
};

const mockRequest = {
  logout: jest.fn(),
  session: {
    destroy: jest.fn(),
  },
};

const mockResponse = {
  json: jest.fn(),
};

describe('Test logout router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('logout function', () => {
    it('should calls mockRequest.logout', () => {
      logoutRouter.logout(mockRequest, mockResponse);
      expect(mockRequest.logout).toBeCalled();
    });

    it('should calls mockRequest.session.destroy', () => {
      logoutRouter.logout(mockRequest, mockResponse);
      expect(mockRequest.session.destroy).toBeCalled();
    });

    it('should calls mockResponse.json with proper arguments', () => {
      logoutRouter.logout(mockRequest, mockResponse);
      expect(mockResponse.json).toBeCalledWith(null);
    });
  });
});
