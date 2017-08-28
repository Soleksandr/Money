import React from 'react';
import { shallow } from 'enzyme';
import Transaction from '../Transaction';


const propsCreator = (users, transactions) => ({
  transactions,
  users,
  match: {
    params: {
      id: null,
    },
  },
});

const users = [
  {
    name: 'Ivan',
    surname: 'Ivanov',
    id: 1,
  },
  {
    name: 'Petr',
    surname: 'Petrov',
    id: 2,
  },
];

const transactions = [
  {
    title: 'test1',
    cost: '1',
    payerId: 1,
    participantsId: [1, 2],
    id: 1,
  },
  {
    title: 'test2',
    cost: '2',
    payerId: 2,
    participantsId: [1, 2],
    id: 2,
  },
];

describe('Test <Transaction>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call renderTransaction with propper parameter method when transaction exist', () => {
    const props = propsCreator(users, transactions);
    const wrapper = shallow(<Transaction {...props} />);
    const instance = wrapper.instance();
    instance.renderTransaction = jest.fn();
    wrapper.setProps({
      match: {
        params: {
          id: transactions[0].id,
        },
      },
    });
    expect(wrapper.instance().renderTransaction).toBeCalledWith(transactions[0]);
  });

  it('should render not less three input when transaction exist', () => {
    const props = propsCreator(users, transactions, 1);
    const wrapper = shallow(<Transaction {...props} />);
    wrapper.setProps({
      match: {
        params: {
          id: transactions[0].id,
        },
      },
    });
    expect(wrapper.find('input').length).toBeGreaterThan(3);
  });

  it('should not call renderTransaction method when transaction does not exist', () => {
    const props = propsCreator(users, transactions, 1000);
    const wrapper = shallow(<Transaction {...props} />);
    const instance = wrapper.instance();
    instance.renderTransaction = jest.fn();
    expect(wrapper.instance().renderTransaction).not.toBeCalled();
  });
});
