import React from 'react';
import { shallow } from 'enzyme';
import Transaction from '../Transaction';

const propsCreator = (users, transactions, id) => ({
  transactions,
  users,
  match: {
    params: {
      id,
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
    id: 1,
  },
];

describe('Test <Transaction>', () => {
  it('should render not less then four input', () => {
    const props = propsCreator(users, transactions, 1);
    const wrapper = shallow(<Transaction {...props} />);
    expect(wrapper.find('input').length).toBeGreaterThan(3);
  });

  it('should not call renderForm method when props.match.params.id equal to not exist transaction', () => {
    const props = propsCreator(users, transactions, 1000);
    const wrapper = shallow(<Transaction {...props} />);
    const instance = wrapper.instance();
    instance.renderForm = jest.fn();
    expect(wrapper.instance().renderForm).not.toBeCalled();
  });
});
