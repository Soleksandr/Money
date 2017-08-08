import React from 'react';
import { shallow } from 'enzyme';
import AddTransactionForm from '../AddTransactionForm';

const props = {
  users: [
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
  ],
  addTransaction: jest.fn(),
  history: {
    push: jest.fn(),
  },
};

describe('Test <AddTransactionForm>', () => {
  it('should render two input', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    expect(wrapper.find('input').length).toBe(2);
  });

  it('should render SelectUser with proper props', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    const instance = wrapper.instance();
    expect(wrapper.find('SelectUser').props().users).toBe(props.users);
    expect(wrapper.find('SelectUser').props().payerId).toBe(instance.state.payerId);
    expect(wrapper.find('SelectUser').props().onPayidByChange).toBe(instance.onPayidByChange);
  });

  it('should render UsersList with proper props', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    const instance = wrapper.instance();
    expect(wrapper.find('UsersList').props().users).toBe(props.users);
    expect(wrapper.find('UsersList').props().onMarkCheckbox).toBe(instance.onMarkCheckbox);
    expect(wrapper.find('UsersList').props().isSelectOpportunity).toBe(true);
  });

  it('should render submit button', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    expect(wrapper.find('button[type="submit"]').length).toBe(1);
  });

  it('instance should contains proper state', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    const state = wrapper.instance().state;
    expect(state.title).toBe('');
    expect(state.cost).toBe('');
    expect(state.payerId).toBe('default');
  });

  it('instance should contains participantsId property', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    expect(wrapper.instance().participantsId).toBeInstanceOf(Array);
  });

  it('instance should contains participantsId property', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    expect(wrapper.instance().participantsId).toBeInstanceOf(Array);
  });

  it('onTitleChange should change state.title', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    wrapper.find('input[placeholder="title"]').simulate('change', { target: 'test' });
    expect(props.onTitleChange).toBeCalled();
  });
});
