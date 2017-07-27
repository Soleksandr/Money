const request = require('supertest');
const app = require('../../app');
const start = require('../start');
const fs = require('fs');
const path = require('path');

const res = {
  sendFile: jest.fn(),
};

const mockApp = {
  get: jest.fn((route, callback) => {
    callback({}, res);
  }),
};

const startPage = fs.readFileSync(
  path.join(__dirname, '../../../../static/index.html'), 'utf-8');

describe('Test route /', () => {
  it('get method sholud return index.html page', () =>
    request(app).get('/').then((resp) => {
      expect(resp.text).toBe(startPage);
    }));

  it('should call get method with first argument "/" and second any function', () => {
    start(mockApp);
    expect(mockApp.get).toHaveBeenCalledWith('/', expect.any(Function));
  });

  it('sendFile method of res param should be called with a string', () => {
    start(mockApp);
    expect(res.sendFile).toBeCalled();
    expect(res.sendFile).toHaveBeenCalledWith(expect.any(String));
  });
});

