const validator = require('../validator');

const correctData = 'correct';
const incorrectData = '';

describe('Test validator', () => {
  describe('Test validateOnEmptiness', () => {
    it('should returns true with correct data', () => {
      const result = validator.validateOnEmptiness(correctData);
      expect(result).toBe(true);
    });

    it('should returns false with correct incorrect data', () => {
      const result = validator.validateOnEmptiness(incorrectData);
      expect(result).toBe(true);
    });
  });
});
