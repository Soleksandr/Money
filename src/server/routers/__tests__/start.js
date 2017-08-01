const request = require('supertest');
const app = require('../../app');
const fs = require('fs');
const path = require('path');

jest.mock('../../app', () => ({
  get: jest.fn(),
}));

const startPage = fs.readFileSync(
  path.join(__dirname, '../../../../static/index.html'), 'utf-8');

describe('Test route /', () => {
  it('get method should return index.html page', () =>
    request(app).get('/').then((res) => {
      expect(res.text).toBe(startPage);
    }));

  it('sendFile method of res param should be called with a string', () =>
    request(app).get('/').then((res) => {
      expect(res.sendFile).toBeCalled();
      expect(res.sendFile).toHaveBeenCalledWith(expect.any(String));
    }),
  );
});

