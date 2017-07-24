const request = require('supertest');
const app = require('../../app');
const config = require('../../test_config');

describe('Test route /users', () => {
  it('get method should return an array', () =>
    request(app).get('/users').then((res) => {
      expect(res.body).toBeInstanceOf(Array);
    }));
  it('post method should return new user', () =>
    request(app).post('/users').send(config.correctUser).then((res) => {
      expect(res.body).toMatchObject(config.correctUser);
    }));
  it('post method should return status 400 when some body property contains empty value', () =>
    request(app).post('/users').send(config.emptyName).then((res) => {
      expect(res.statusCode).toBe(400);
    }));
});

describe('Test route /users', () => {
  it('get method should return an array', () =>
    request(app).get('/users').then((res) => {
      expect(res.body).toBeInstanceOf(Array);
    }));
});

describe('Test route /users/:id/transactions', () => {
  beforeEach(() => {
    config.initDb();
  });

  afterEach(() => {
    config.clearDb();
  });

  it('get method with user id which exists should return an array', () =>
    request(app).get('/users/1/transactions').then((res) => {
      expect(res.body).toBeInstanceOf(Array);
    }));
  it('get method with user id which does not exist should return status 404', () =>
    request(app).get('/users/100/transactions').then((res) => {
      expect(res.statusCode).toBe(404);
    }));
});
