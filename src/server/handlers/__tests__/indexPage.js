const request = require('supertest');
const app = require('../../app');
const fs = require('fs');
const path = require('path');

const startPage = fs.readFileSync(
  path.join(__dirname, '../../../../static/index.html'), 'utf-8');

describe('Test indexPage', () => {
  it('should return index.html page', () =>
    request(app).get('/').then((res) => {
      expect(res.text).toBe(startPage);
    }));
});

