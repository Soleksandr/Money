import React from 'react';
import { shallow } from 'enzyme';
import Transaction from '../Transaction';

const propsCreator = (users, transactions) => ({
  transactions,
  users,
  match: {
    params: {
      id: 1,
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
    cost: 1,
    payerId: 1,
    participantsId: [1, 2],
    id: 1,
  },
  {
    title: 'test2',
    cost: 2,
    payerId: 2,
    participantsId: [1, 2],
    id: 1,
  },
];

describe('Test <Transaction>', () => {
  it('should render not less then four input', () => {
    const props = propsCreator(users, transactions);
    const wrapper = shallow(<Transaction {...props} />);
    expect(wrapper.find('input').length).toBeGreaterThan(3);
  });

  it('should not call renderForm method when props.transactions and props.users are empty arrays', () => {
    const props = propsCreator([], []);
    const wrapper = shallow(<Transaction {...props} />);
    wrapper.instance().renderForm = jest.fn();
    wrapper.update();
    expect(wrapper.instance().renderForm).not.toBeCalled();
  });

  it('should call renderForm method when props.transactions and props.users are not empty arrays', () => {
    const props = propsCreator([], []);
    const wrapper = shallow(<Transaction {...props} />);
    wrapper.instance().renderForm = jest.fn();
    wrapper.setProps({ users, transactions });
    wrapper.update();
    expect(wrapper.instance().renderForm).toBeCalled();
  });
});
