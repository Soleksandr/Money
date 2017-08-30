import React from 'react';
import { shallow } from 'enzyme';
import AddUserForm from '../AddUserForm';
import { validator } from '../../../utils/validator';
import * as constants from '../../../constants';

const mockValidResult = null;

jest.mock('../../../utils/validator', () => ({
  validator: jest.fn(() => mockValidResult),
}));

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
  createUser: jest.fn(() => Promise.resolve(true)),
  history: {
    push: jest.fn(),
  },
};

const testArg = 'test';

const testEventArg = {
  target: {
    value: 'test',
  },
  preventDefault: jest.fn(),
};

describe('Test <AddUserForm>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render two input', () => {
    const wrapper = shallow(<AddUserForm {...props} />);
    expect(wrapper.find('Input').length).toBe(4);
  });

  it('should render Input with placeholder username with proper props', () => {
    const wrapper = shallow(<AddUserForm {...props} />);
    const instance = wrapper.instance();
    expect(wrapper.find('Input[placeholder="username"]').props().value).toBe(instance.state.username.value);
    expect(wrapper.find('Input[placeholder="username"]').props().onChange).toBe(instance.onUsernameChange);
    expect(wrapper.find('Input[placeholder="username"]').props().errorMessage).toBe(instance.state.username.errorMessage);
    expect(wrapper.find('Input[placeholder="username"]').props().validateOn).toEqual([constants.NOT_EMPTY]);
  });

  it('should render Input with placeholder name with proper props', () => {
    const wrapper = shallow(<AddUserForm {...props} />);
    const instance = wrapper.instance();
    expect(wrapper.find('Input[placeholder="name"]').props().value).toBe(instance.state.name.value);
    expect(wrapper.find('Input[placeholder="name"]').props().onChange).toBe(instance.onNameChange);
    expect(wrapper.find('Input[placeholder="name"]').props().errorMessage).toBe(instance.state.name.errorMessage);
    expect(wrapper.find('Input[placeholder="name"]').props().validateOn).toEqual([constants.NOT_EMPTY]);
  });

  it('should render Input with placeholder surname with proper props', () => {
    const wrapper = shallow(<AddUserForm {...props} />);
    const instance = wrapper.instance();
    expect(wrapper.find('Input[placeholder="surname"]').props().value).toBe(instance.state.surname.value);
    expect(wrapper.find('Input[placeholder="surname"]').props().onChange).toBe(instance.onSurnameChange);
    expect(wrapper.find('Input[placeholder="surname"]').props().errorMessage).toBe(instance.state.surname.errorMessage);
    expect(wrapper.find('Input[placeholder="surname"]').props().validateOn).toEqual([constants.NOT_EMPTY]);
  });

  it('should render Input with placeholder password with proper props', () => {
    const wrapper = shallow(<AddUserForm {...props} />);
    const instance = wrapper.instance();
    expect(wrapper.find('Input[placeholder="password"]').props().value).toBe(instance.state.password.value);
    expect(wrapper.find('Input[placeholder="password"]').props().onChange).toBe(instance.onPasswordChange);
    expect(wrapper.find('Input[placeholder="password"]').props().errorMessage).toBe(instance.state.password.errorMessage);
    expect(wrapper.find('Input[placeholder="password"]').props().validateOn).toEqual([constants.NOT_EMPTY]);
  });


  it('should render submit button', () => {
    const wrapper = shallow(<AddUserForm {...props} />);
    expect(wrapper.find('button[type="submit"]').length).toBe(1);
  });

  it('instance should contains proper state', () => {
    const wrapper = shallow(<AddUserForm {...props} />);
    const state = wrapper.instance().state;
    expect(state.username.value).toBe('');
    expect(state.name.value).toBe('');
    expect(state.surname.value).toBe('');
    expect(state.password.value).toEqual('');
    expect(state.username.errorMessage).toBe(null);
    expect(state.name.errorMessage).toBe(null);
    expect(state.surname.errorMessage).toBe(null);
    expect(state.password.errorMessage).toBe(null);
  });

  it('onUsernameChange should change state.username', () => {
    const wrapper = shallow(<AddUserForm {...props} />);
    wrapper.find('Input[placeholder="username"]').simulate('change', testArg);
    expect(wrapper.instance().state.username.value).toBe(testArg);
  });

  it('onNameChange should change state.name', () => {
    const wrapper = shallow(<AddUserForm {...props} />);
    wrapper.find('Input[placeholder="name"]').simulate('change', testArg);
    expect(wrapper.instance().state.name.value).toBe(testArg);
  });

  it('onSurnameChange should change state.surname', () => {
    const wrapper = shallow(<AddUserForm {...props} />);
    wrapper.find('Input[placeholder="surname"]').simulate('change', testArg);
    expect(wrapper.instance().state.surname.value).toBe(testArg);
  });

  it('onPasswordChange should change state.password', () => {
    const wrapper = shallow(<AddUserForm {...props} />);
    wrapper.find('Input[placeholder="password"]').simulate('change', testArg);
    expect(wrapper.instance().state.password.value).toBe(testArg);
  });

  it('form submitting should calls preventDefault method of event argument', () => {
    const wrapper = shallow(<AddUserForm {...props} />);
    wrapper.find('form').simulate('submit', testEventArg);
    expect(testEventArg.preventDefault).toBeCalled();
  });

  it('form submitting should calls validator with proper argument', () => {
    const wrapper = shallow(<AddUserForm {...props} />);
    const instance = wrapper.instance();
    instance.state.username.value = 'username';
    instance.state.name.value = 'name';
    instance.state.surname.value = 'surname';
    instance.state.password.value = 'password';
    wrapper.find('form').simulate('submit', testEventArg);
    expect(validator).toBeCalledWith(instance.state.username.value, [constants.NOT_EMPTY]);
    expect(validator).toBeCalledWith(instance.state.name.value, [constants.NOT_EMPTY]);
    expect(validator).toBeCalledWith(instance.state.surname.value, [constants.NOT_EMPTY]);
    expect(validator).toBeCalledWith(instance.state.password.value, [constants.NOT_EMPTY]);
  });

  it('form submitting should set errorMessage property to proper value', () => {
    const wrapper = shallow(<AddUserForm {...props} />);
    const instance = wrapper.instance();
    wrapper.find('form').simulate('submit', testEventArg);
    expect(instance.state.username.errorMessage).toBe(mockValidResult);
  });

  it('form submitting should calls props.createUser, when fields validation successfull', () => {
    const wrapper = shallow(<AddUserForm {...props} />);
    const instance = wrapper.instance();
    wrapper.find('form').simulate('submit', testEventArg);
    expect(props.createUser).toBeCalledWith({
      username: instance.state.username.value.trim(),
      name: instance.state.name.value.trim(),
      surname: instance.state.surname.value.trim(),
      password: instance.state.password.value.trim(),
    });
  });


  it('form submitting should not calls props.createUser, when fields validation faild', () => {
    const wrapper = shallow(<AddUserForm {...props} />);
    validator.mockImplementation(() => 'invalid');
    wrapper.find('form').simulate('submit', testEventArg);
    expect(props.createUser).not.toBeCalled();
  });
});
