import { validator } from '../validator';

describe('Test validator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return responding message for invalid value for case $notEmpty', () => {
    const requirement = { $notEmpty: true };
    const value = '';
    expect(validator(value, requirement)).toBe('this field is required');
  });

  it('should return responding message for invalid value for case $isNumber', () => {
    const requirement = { $isNumber: true };
    const value = 'text';
    expect(validator(value, requirement)).toBe('only numbers are allowed');
  });

  it('should return responding message for invalid value for case $anySelected', () => {
    const requirement = { $anySelected: true };
    const value = 'default';
    expect(validator(value, requirement)).toBe('payer was not selected');
  });

  it('should return responding message for invalid value for case $checkedNumber', () => {
    const requirement = { $checkedNumber: 2 };
    const value = 1;
    expect(validator(value, requirement)).toBe('at least one participant should be included');
  });

  it('should return null for valid value for case $notEmpty', () => {
    const requirement = { $notEmpty: true };
    const value = 'test';
    expect(validator(value, requirement)).toBe(null);
  });

  it('should return null for valid value for case $isNumber', () => {
    const requirement = { $isNumber: true };
    const value = 1;
    expect(validator(value, requirement)).toBe(null);
  });

  it('should return null for valid value for case $anySelected', () => {
    const requirement = { $anySelected: true };
    const value = 'correct';
    expect(validator(value, requirement)).toBe(null);
  });

  it('should return null for valid value for case $checkedNumber', () => {
    const requirement = { $checkedNumber: 1 };
    const value = 2;
    expect(validator(value, requirement)).toBe(null);
  });
});
