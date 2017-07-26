const request = require('supertest');
const app = require('../../app');
const transactions = require('../transactions');

describe('Test route /transactions', () => {
  it('get method should return an array', () =>
    request(app).get('/transactions').then((res) => {
      expect(res.body).toBeInstanceOf(Array);
    }));
  it('post method should return new transaction', () =>
    request(app).post('/transactions').send(config.correctTransaction).then((res) => {
      expect(res.body).toMatchObject(config.correctTransaction);
    }));
  it('post method should return status 400 when some body property contains empty value', () =>
    request(app).post('/transactions').send(config.emptyTitle).then((res) => {
      expect(res.statusCode).toBe(400);
    }));
});
