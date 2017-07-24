const request = require('supertest');
const app = require('../../app');

describe('Test route /', () => {
  it('get method sholud return string "This is the data for start page"', () =>
    request(app).get('/').then((res) => {
      expect(res.body).toBe('This is the data for start page');
    }));
});
