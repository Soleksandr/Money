import React from 'react';
import { shallow } from 'enzyme';
import AddUserForm from '../AddUserForm';

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
  addUser: jest.fn(),
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

describe('Test <AddUserForm>', () => {
  it('should render two input', () => {
    const wrapper = shallow(<AddUserForm {...props} />);
    expect(wrapper.find('input').length).toBe(2);
  });

  it('should render submit button', () => {
    const wrapper = shallow(<AddUserForm {...props} />);
    expect(wrapper.find('button[type="submit"]').length).toBe(1);
  });

  it('instance should contains proper state', () => {
    const wrapper = shallow(<AddUserForm {...props} />);
    const state = wrapper.instance().state;
    expect(state.name).toBe('');
    expect(state.surname).toBe('');
  });

  it('onNameChange should change state.surname', () => {
    const wrapper = shallow(<AddUserForm {...props} />);
    wrapper.find('input[placeholder="name"]').simulate('change', testArg);
    expect(wrapper.instance().state.name).toBe(testArg.target.value);
  });

  it('onSurnameChange should change state.surname', () => {
    const wrapper = shallow(<AddUserForm {...props} />);
    wrapper.find('input[placeholder="surname"]').simulate('change', testArg);
    expect(wrapper.instance().state.surname).toBe(testArg.target.value);
  });

  it('form submitting should calls preventDefault method', () => {
    const wrapper = shallow(<AddUserForm {...props} />);
    wrapper.find('form').simulate('submit', testArg);
    expect(testArg.preventDefault).toBeCalled();
  });

  it('form submitting should calls addUser with proper argument', () => {
    const wrapper = shallow(<AddUserForm {...props} />);
    const instance = wrapper.instance();
    wrapper.find('form').simulate('submit', testArg);
    expect(props.addUser).toBeCalledWith(instance.state);
  });

  it('form submitting should calls history.push with proper argument', () => {
    const wrapper = shallow(<AddUserForm {...props} />);
    wrapper.find('form').simulate('submit', testArg);
    expect(props.history.push).toBeCalledWith('/participants');
  });
});
