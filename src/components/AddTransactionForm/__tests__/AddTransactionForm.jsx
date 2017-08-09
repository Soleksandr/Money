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

const testArg = {
  target: {
    value: 'test',
  },
  preventDefault: jest.fn(),
};

const testParticipant = 'test';

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

  it('onTitleChange should change state.title', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    wrapper.find('input[placeholder="title"]').simulate('change', testArg);
    expect(wrapper.instance().state.title).toBe(testArg.target.value);
  });

  it('onCostChange should change state.cost', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    wrapper.find('input[placeholder="cost"]').simulate('change', testArg);
    expect(wrapper.instance().state.cost).toBe(testArg.target.value);
  });

  it('onPayidByChange should change state.payerId', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    wrapper.instance().onPayidByChange(testArg);
    expect(wrapper.instance().state.payerId).toBe(testArg.target.value);
  });

  it('onMarkCheckbox should push new participant, when isChecked is true', () => {
    const isChecked = true;
    const wrapper = shallow(<AddTransactionForm {...props} />);
    wrapper.instance().onMarkCheckbox(testParticipant, isChecked);
    expect(wrapper.instance().participantsId).toContain(testParticipant);
  });

  it('onMarkCheckbox should remove existing participant, when isChecked is false', () => {
    const isChecked = false;
    const wrapper = shallow(<AddTransactionForm {...props} />);
    wrapper.instance().participantsId.push(testParticipant);
    wrapper.instance().onMarkCheckbox(testParticipant, isChecked);
    expect(wrapper.instance().participantsId).not.toContain(testParticipant);
  });

  it('form submitting should calls preventDefault method', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    wrapper.find('form').simulate('submit', testArg);
    expect(testArg.preventDefault).toBeCalled();
  });

  it('form submitting should calls addTransaction with proper argument', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    const instance = wrapper.instance();
    wrapper.find('form').simulate('submit', testArg);
    expect(props.addTransaction).toBeCalledWith({
      title: instance.state.title,
      cost: parseFloat(instance.state.cost),
      payerId: parseInt(instance.state.payerId, 10),
      participantsId: instance.participantsId,
    });
  });

  it('form submitting should calls history.push with proper argument', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    wrapper.find('form').simulate('submit', testArg);
    expect(props.history.push).toBeCalledWith('/all_transactions');
  });
});
