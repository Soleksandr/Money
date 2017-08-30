import React from 'react';
import { shallow } from 'enzyme';
import Login from '../Login';
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
  login: jest.fn(() => Promise.resolve(true)),
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

describe('Test <Login>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render two input', () => {
    const wrapper = shallow(<Login {...props} />);
    expect(wrapper.find('Input').length).toBe(2);
  });

  it('should render Input with placeholder username with proper props', () => {
    const wrapper = shallow(<Login {...props} />);
    const instance = wrapper.instance();
    expect(wrapper.find('Input[placeholder="username"]').props().value).toBe(instance.state.username.value);
    expect(wrapper.find('Input[placeholder="username"]').props().onChange).toBe(instance.onUsernameChange);
    expect(wrapper.find('Input[placeholder="username"]').props().errorMessage).toBe(instance.state.username.errorMessage);
    expect(wrapper.find('Input[placeholder="username"]').props().validateOn).toEqual([constants.NOT_EMPTY]);
  });

  it('should render Input with placeholder password with proper props', () => {
    const wrapper = shallow(<Login {...props} />);
    const instance = wrapper.instance();
    expect(wrapper.find('Input[placeholder="password"]').props().value).toBe(instance.state.password.value);
    expect(wrapper.find('Input[placeholder="password"]').props().onChange).toBe(instance.onPasswordChange);
    expect(wrapper.find('Input[placeholder="password"]').props().errorMessage).toBe(instance.state.password.errorMessage);
    expect(wrapper.find('Input[placeholder="password"]').props().validateOn).toEqual([constants.NOT_EMPTY]);
  });


  it('should render submit button', () => {
    const wrapper = shallow(<Login {...props} />);
    expect(wrapper.find('button[type="submit"]').length).toBe(1);
  });

  it('instance should contains proper state', () => {
    const wrapper = shallow(<Login {...props} />);
    const state = wrapper.instance().state;
    expect(state.username.value).toBe('');
    expect(state.password.value).toEqual('');
    expect(state.username.errorMessage).toBe(null);
    expect(state.password.errorMessage).toBe(null);
  });

  it('onUsernameChange should change state.username', () => {
    const wrapper = shallow(<Login {...props} />);
    wrapper.find('Input[placeholder="username"]').simulate('change', testArg);
    expect(wrapper.instance().state.username.value).toBe(testArg);
  });

  it('onPasswordChange should change state.password', () => {
    const wrapper = shallow(<Login {...props} />);
    wrapper.find('Input[placeholder="password"]').simulate('change', testArg);
    expect(wrapper.instance().state.password.value).toBe(testArg);
  });

  it('form submitting should calls preventDefault method of event argument', () => {
    const wrapper = shallow(<Login {...props} />);
    wrapper.find('form').simulate('submit', testEventArg);
    expect(testEventArg.preventDefault).toBeCalled();
  });

  it('form submitting should calls validator with proper argument', () => {
    const wrapper = shallow(<Login {...props} />);
    const instance = wrapper.instance();
    instance.state.username.value = 'username';
    instance.state.password.value = 'password';
    wrapper.find('form').simulate('submit', testEventArg);
    expect(validator).toBeCalledWith(instance.state.username.value, [constants.NOT_EMPTY]);
    expect(validator).toBeCalledWith(instance.state.password.value, [constants.NOT_EMPTY]);
  });

  it('form submitting should set errorMessage property to proper value', () => {
    const wrapper = shallow(<Login {...props} />);
    const instance = wrapper.instance();
    wrapper.find('form').simulate('submit', testEventArg);
    expect(instance.state.username.errorMessage).toBe(mockValidResult);
  });

  it('form submitting should calls props.login, when fields validation successfull', () => {
    const wrapper = shallow(<Login {...props} />);
    const instance = wrapper.instance();
    wrapper.find('form').simulate('submit', testEventArg);
    expect(props.login).toBeCalledWith({
      username: instance.state.username.value.trim(),
      password: instance.state.password.value.trim(),
    });
  });


  it('form submitting should not calls props.login, when fields validation faild', () => {
    const wrapper = shallow(<Login {...props} />);
    validator.mockImplementation(() => 'invalid');
    wrapper.find('form').simulate('submit', testEventArg);
    expect(props.login).not.toBeCalled();
  });
});
