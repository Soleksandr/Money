const rootRouter = require('../root');

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

describe('Test root router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRequest.user = mockUser;
  });

  describe('getSessionUser function', () => {
    it('should calls mockResponse.json with proper argumet if mockRequest.user define', () => {
      rootRouter.getSessionUser(mockRequest, mockResponse);
      expect(mockResponse.json).toBeCalledWith(mockUser);
    });

    it('should calls mockResponse.json with proper argument if mockRequest.user is not define', () => {
      mockRequest.user = null;
      rootRouter.getSessionUser(mockRequest, mockResponse);
      expect(mockResponse.json).toBeCalledWith(null);
    });
  });
});
