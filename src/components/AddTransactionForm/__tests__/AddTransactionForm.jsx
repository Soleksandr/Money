import React from 'react';
import { shallow, mount } from 'enzyme';
import AddTransactionForm from '../AddTransactionForm';
import { validator } from '../../../utils/validator';
import * as constants from '../../../constants';

const mockValidResult = null;

jest.mock('../../../utils/validator', () => ({
  validator: jest.fn(() => mockValidResult),
}));

const props = {
  getUsers: jest.fn(),
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
  createTransaction: jest.fn(() => Promise.resolve(true)),
  history: {
    push: jest.fn(),
  },
};

const testEventArg = {
  target: {
    value: 'test',
  },
  preventDefault: jest.fn(),
};
const testArg = 'test';
const testId = 1;

describe('Test <AddTransactionForm>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should calls componentDidMount', () => {
    const spy = jest.spyOn(AddTransactionForm.prototype, 'componentDidMount');
    mount(<AddTransactionForm {...props} />);
    expect(spy).toHaveBeenCalled();
  });

  it('props.getUsers should be called', () => {
    mount(<AddTransactionForm {...props} />);
    expect(props.getUsers).toHaveBeenCalled();
  });

  it('should render two Input', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    expect(wrapper.find('Input').length).toBe(2);
  });

  it('should render first Input with proper props', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    const instance = wrapper.instance();
    expect(wrapper.find('Input[placeholder="title"]').props().value).toBe(instance.state.title.value);
    expect(wrapper.find('Input[placeholder="title"]').props().onChange).toBe(instance.onTitleChange);
    expect(wrapper.find('Input[placeholder="title"]').props().errorMessage).toBe(instance.state.title.errorMessage);
    expect(wrapper.find('Input[placeholder="title"]').props().validateOn).toEqual([constants.NOT_EMPTY]);
  });

  it('should render second Input with proper props', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    const instance = wrapper.instance();
    expect(wrapper.find('Input[placeholder="cost"]').props().value).toBe(instance.state.cost.value);
    expect(wrapper.find('Input[placeholder="cost"]').props().onChange).toBe(instance.onCostChange);
    expect(wrapper.find('Input[placeholder="cost"]').props().errorMessage).toBe(instance.state.cost.errorMessage);
    expect(wrapper.find('Input[placeholder="cost"]').props().validateOn).toEqual([constants.NOT_EMPTY, constants.IS_NUMBER]);
  });

  it('should render SelectUser with proper props', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    const instance = wrapper.instance();
    expect(wrapper.find('SelectUser').props().users).toBe(props.users);
    expect(wrapper.find('SelectUser').props().value).toBe(instance.state.payerId.value);
    expect(wrapper.find('SelectUser').props().errorMessage).toBe(instance.state.payerId.errorMessage);
    expect(wrapper.find('SelectUser').props().onPayidByChange).toBe(instance.onPayidByChange);
  });

  it('should render UsersList with proper props', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    const instance = wrapper.instance();
    expect(wrapper.find('UsersList').props().users).toBe(props.users);
    expect(wrapper.find('UsersList').props().onMarkCheckbox).toBe(instance.onMarkCheckbox);
    expect(wrapper.find('SelectUser').props().errorMessage).toBe(instance.state.participantsId.errorMessage);
    expect(wrapper.find('UsersList').props().isSelectOpportunity).toBe(true);
  });

  it('should render submit button', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    expect(wrapper.find('button[type="submit"]').length).toBe(1);
  });

  it('instance should contains proper state', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    const state = wrapper.instance().state;
    expect(state.title.value).toBe('');
    expect(state.cost.value).toBe('');
    expect(state.payerId.value).toBe('default');
    expect(state.participantsId.value).toEqual([]);
    expect(state.title.errorMessage).toBe(null);
    expect(state.cost.errorMessage).toBe(null);
    expect(state.payerId.errorMessage).toBe(null);
    expect(state.participantsId.errorMessage).toBe(null);
  });

  it('onTitleChange should change state.title.value', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    wrapper.find('Input[placeholder="title"]').simulate('change', testArg);
    expect(wrapper.instance().state.title.value).toBe(testArg);
  });

  it('onCostChange should change state.cost', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    wrapper.find('Input[placeholder="cost"]').simulate('change', testArg);
    expect(wrapper.instance().state.cost.value).toBe(testArg);
  });

  it('onPayidByChange should change state.payerId', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    wrapper.instance().onPayidByChange(testEventArg);
    expect(wrapper.instance().state.payerId.value).toBe(testEventArg.target.value);
  });

  it('onMarkCheckbox should push new participant, when isChecked is true', () => {
    const isChecked = true;
    const wrapper = shallow(<AddTransactionForm {...props} />);
    wrapper.instance().onMarkCheckbox(testId, isChecked);
    expect(wrapper.instance().state.participantsId.value).toContain(testId);
  });

  it('onMarkCheckbox should set errorMessage to null, when isChecked is true', () => {
    const isChecked = true;
    const wrapper = shallow(<AddTransactionForm {...props} />);
    const instance = wrapper.instance();
    instance.state.participantsId.errorMessage = 'error';
    instance.onMarkCheckbox(testId, isChecked);
    expect(instance.state.participantsId.errorMessage).toBe(null);
  });

  it('onMarkCheckbox should remove existing participant, when isChecked is false', () => {
    const isChecked = false;
    const wrapper = shallow(<AddTransactionForm {...props} />);
    const instance = wrapper.instance();
    instance.state.participantsId.value.push(testId);
    instance.onMarkCheckbox(testId, isChecked);
    expect(instance.state.participantsId.value).not.toContain(testId);
  });

  it('form submitting should calls preventDefault method of event argument', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    wrapper.find('form').simulate('submit', testEventArg);
    expect(testEventArg.preventDefault).toBeCalled();
  });

  it('form submitting should calls validator with proper argument', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    const instance = wrapper.instance();
    instance.state.title.value = 'title';
    instance.state.cost.value = 'cost';
    instance.state.payerId.value = 'payerId';
    instance.state.participantsId.value = 'participantsId';
    wrapper.find('form').simulate('submit', testEventArg);
    expect(validator).toBeCalledWith(instance.state.title.value, [constants.NOT_EMPTY]);
    expect(validator).toBeCalledWith(instance.state.cost.value, [constants.NOT_EMPTY]);
    expect(validator).toBeCalledWith(instance.state.payerId.value, [constants.ANY_SELECTED]);
    expect(validator).toBeCalledWith(instance.state.participantsId.value, [constants.ANY_CHECKED]);
  });

  it('form submitting should set errorMessage property to proper value', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    const instance = wrapper.instance();
    wrapper.find('form').simulate('submit', testEventArg);
    expect(instance.state.title.errorMessage).toBe(mockValidResult);
  });

  it('form submitting should calls props.createTransaction, when fields validation successfull', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    const instance = wrapper.instance();
    wrapper.find('form').simulate('submit', testEventArg);
    expect(props.createTransaction).toBeCalledWith({
      title: instance.state.title.value.trim(),
      cost: Math.round(instance.state.cost.value * 100) / 100,
      payerId: parseInt(instance.state.payerId.value, 10),
      participantsId: instance.state.participantsId.value,
    });
  });

  it('form submitting should not calls props.createTransaction, when fields validation faild', () => {
    const wrapper = shallow(<AddTransactionForm {...props} />);
    validator.mockImplementation(() => 'invalid');
    wrapper.find('form').simulate('submit', testEventArg);
    expect(props.createTransaction).not.toBeCalled();
  });
});
