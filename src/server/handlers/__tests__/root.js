const handlers = require('../root');
const { modelUser } = require('../../models');


jest.mock('../../models', () => ({
  modelUser: {
    findById: jest.fn(() => Promise.resolve('resolved')),
  },
}));

const mockId = 1;

describe('Test root handler', () => {
  it('should calls getSessionUser with proper arguments', () =>
    handlers.getSessionUser(mockId).then(() =>
      expect(modelUser.findById).toBeCalledWith(mockId),
    ),
  );
});
