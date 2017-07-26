const request = require('supertest');
const app = require('../../app');
const start = require('../start');

const res = {
  sendFile: jest.fn(),
};

const mockApp = {
  get: jest.fn((route, callback) => {
    callback({}, res);
  }),
};

describe('Test route /', () => {
  it('get method sholud call sendFile method of res param', () =>
    request(app).get('/').then((resp) => {
      expect(resp.text.indexOf('<!DOCTYPE html>')).toBe(0);
    }));

  it('should call get method of parameter with first argunent === "/"', () => {
    start(mockApp);
    expect(mockApp.get).toHaveBeenCalledWith('/', expect.any(Function));
  });

  it('sendFile method of res param should be called with a string', () => {
    expect(res.sendFile).toBeCalled();
    expect(typeof res.sendFile.mock.calls[0][0] === 'string').toBeTruthy();
  });
});

