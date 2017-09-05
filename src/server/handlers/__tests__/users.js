// const handlers = require('../users');
// const { modelUser } = require('../../models');


// jest.mock('../../models', () => ({
//   modelUser: {
//     findAll: jest.fn(() => Promise.resolve([{ get: jest.fn() }])),
//   },
// }));

// const mockParam = {
//   name: 'Ivan',
//   surname: 'Ivanov',
// };

// describe('Test getUsers handler', () => {
//   it('should calls modelUser.findAll with proper parameter', () =>
//     handlers.getUsers(mockParam).then(() =>
//       expect(modelUser.findAll).toBeCalled(),
//     ),
//   );
// });
