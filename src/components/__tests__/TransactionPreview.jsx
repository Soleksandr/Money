import React from 'react';
import { shallow } from 'enzyme';
import TransactionPreview from '../TransactionPreview';

const mockUser1 = {
  username: 'ivan',
  name: 'Ivan',
  surname: 'Ivanov',
  id: 1,
};

const mockUser2 = {
  username: 'petr',
  name: 'Petr',
  surname: 'Petrov',
  id: 2,
};

const mockUser3 = {
  username: 'petr',
  name: 'Petr',
  surname: 'Petrov',
  id: 3,
};

const props = {
  title: 'test',
  cost: '1',
  participants: [mockUser1, mockUser2, mockUser3],
};

describe('Test <TransactionPreview>', () => {
  it('should render one li', () => {
    const wrapper = shallow(<TransactionPreview {...props} />);
    expect(wrapper.find('li').length).toBe(1);
  });
});
