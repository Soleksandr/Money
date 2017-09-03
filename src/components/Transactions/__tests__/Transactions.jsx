import React from 'react';
import { shallow } from 'enzyme';
import Transactions from '../Transactions';


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

const mockProps = {
  users: [
    mockUser1,
    mockUser2,
  ],
  transactions: [
    {
      title: 'test1',
      cost: '1',
      payer: mockUser1,
      participants: [mockUser1, mockUser3],
      id: 1,
    },
    {
      title: 'test2',
      cost: '2',
      payer: mockUser3,
      participants: [mockUser2, mockUser3],
      id: 2,
    },
  ],
  match: {
    params: {
      id: null,
    },
  },
};

describe('Test <Transactions>', () => {
  it('should render one TransactionsList', () => {
    const wrapper = shallow(<Transactions {...mockProps} />);
    expect(wrapper.find('TransactionsList').length).toEqual(1);
  });

  it('should render TransactionsList with proper props when match.params.id is null', () => {
    const wrapper = shallow(<Transactions {...mockProps} />);
    expect(wrapper.find('TransactionsList').props().transactions).toEqual(mockProps.transactions);
  });

  it('should render TransactionsList with proper props when match.params.id proper is defined', () => {
    mockProps.match.params.id = mockProps.users[0].id;
    const wrapper = shallow(<Transactions {...mockProps} />);
    expect(wrapper.find('TransactionsList').props().transactions).toEqual([mockProps.transactions[0]]);
  });

  it('should render one link', () => {
    const wrapper = shallow(<Transactions {...mockProps} />);
    expect(wrapper.find('Link').length).toBe(1);
  });

  it('sets prop "to" of Link to proper path', () => {
    const wrapper = shallow(<Transactions {...mockProps} />);
    expect(wrapper.find('Link').first().props().to)
      .toEqual(expect.stringContaining('/new_transaction'));
  });
});
