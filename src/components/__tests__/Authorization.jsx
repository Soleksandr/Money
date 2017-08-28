import React from 'react';
import Authorization from '../Authorization';

const MockCopmonent = () => <div>mock</div>;

const mockProps = 'props';

const mockUser = {
  username: 'ivan',
  name: 'Ivan',
  surname: 'Ivanov',
  id: 1,
};

describe('Test <Authorization>', () => {
  it('should return MockCopmonent, when second parametr user', () => {
    expect(Authorization(MockCopmonent, mockUser)()).toEqual(<MockCopmonent />);
  });

  it('should put all props to MockCopmonent, when second parametr user', () => {
    expect(Authorization(MockCopmonent, mockUser)(mockProps))
      .toEqual(<MockCopmonent {...mockProps} />);
  });

  it('should not return MockCopmonent, when second parametr null', () => {
    expect(Authorization(MockCopmonent, null)()).not.toEqual(<MockCopmonent />);
  });
});
