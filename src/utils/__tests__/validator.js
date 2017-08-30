import { validator } from '../validator';
import * as constants from '../../constants';

describe('Test validator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return responding message for invalid value for case NOT_EMPTY', () => {
    const requirement = [constants.NOT_EMPTY];
    const value = '';
    expect(validator(value, requirement)).toBe('this field is required');
  });

  it('should return responding message for invalid value for case IS_NUMBER', () => {
    const requirement = [constants.IS_NUMBER];
    const value = 'text';
    expect(validator(value, requirement)).toBe('only numbers are allowed');
  });

  it('should return responding message for invalid value for case ANY_SELECTED', () => {
    const requirement = [constants.ANY_SELECTED];
    const value = 'default';
    expect(validator(value, requirement)).toBe('payer was not selected');
  });

  it('should return responding message for invalid value for case ANY_CHECKED', () => {
    const requirement = [constants.ANY_CHECKED];
    const value = 0;
    expect(validator(value, requirement)).toBe('at least one participant should be included');
  });

  it('should return null for valid value for case NOT_EMPTY', () => {
    const requirement = [constants.NOT_EMPTY];
    const value = 'test';
    expect(validator(value, requirement)).toBe(null);
  });

  it('should return null for valid value for case IS_NUMBER', () => {
    const requirement = [constants.IS_NUMBER];
    const value = 1;
    expect(validator(value, requirement)).toBe(null);
  });

  it('should return null for valid value for case ANY_SELECTED', () => {
    const requirement = [constants.ANY_SELECTED];
    const value = 'correct';
    expect(validator(value, requirement)).toBe(null);
  });

  it('should return null for valid value for case ANY_CHECKED', () => {
    const requirement = [constants.ANY_CHECKED];
    const value = 2;
    expect(validator(value, requirement)).toBe(null);
  });
});
