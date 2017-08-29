import React from 'react';
import { shallow, mount } from 'enzyme';
import Input from '../Input';
import { validator } from '../../utils/validator';

jest.mock('../../utils/validator', () => ({
  validator: jest.fn(data => data),
}));

const props = {
  type: 'type',
  placeholder: 'placeholder',
  value: 'value',
  errorMessage: null,
  onChange: jest.fn(),
};

const testArg = 'test';

const testEventArg = {
  target: {
    value: 'test',
  },
};

describe('Test <Input>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    props.errorMessage = null;
  });

  it('should render one input', () => {
    const wrapper = shallow(<Input {...props} />);
    expect(wrapper.find('input').length).toBe(1);
  });

  it('should render input with proper props', () => {
    const wrapper = shallow(<Input {...props} />);
    expect(wrapper.find('input').props().type).toBe(props.type);
    expect(wrapper.find('input').props().placeholder).toBe(props.placeholder);
    expect(wrapper.find('input').props().value).toBe(props.value);
  });

  it('should not render ErrorMessage if props.errorMessage is null', () => {
    const wrapper = shallow(<Input {...props} />);
    expect(wrapper.find('ErrorMessage').length).toBe(0);
  });

  it('should not render ErrorMessage if state.errorMessage is null', () => {
    const wrapper = shallow(<Input {...props} />);
    expect(wrapper.find('ErrorMessage').length).toBe(0);
  });

  it('should render ErrorMessage if props.errorMessage is not null', () => {
    props.errorMessage = 'error';
    const wrapper = shallow(<Input {...props} />);
    expect(wrapper.find('ErrorMessage').length).toBe(1);
  });

  it('should render ErrorMessage if state.errorMessage is not null', () => {
    const wrapper = shallow(<Input {...props} />);
    wrapper.instance().setState({ errorMessage: 'error' });
    expect(wrapper.find('ErrorMessage').length).toBe(1);
  });

  it('instance should contains proper state', () => {
    const wrapper = shallow(<Input {...props} />);
    const state = wrapper.instance().state;
    expect(state.errorMessage).toBe(null);
  });

  it('onChange should calls props.onChange with proper value', () => {
    const wrapper = shallow(<Input {...props} />);
    wrapper.find('input').simulate('change', testEventArg);
    expect(props.onChange).toBeCalledWith(testEventArg.target.value);
  });

  it('onChange should change state.errorMessage property to null if it does not', () => {
    const wrapper = shallow(<Input {...props} />);
    const instance = wrapper.instance();
    instance.setState({ errorMessage: 'error' });
    wrapper.find('input').simulate('change', testEventArg);
    expect(instance.state.errorMessage).toBe(null);
  });

  it('onChange should not calls setState if props.errorMessage is equal to null', () => {
    const spy = jest.spyOn(Input.prototype, 'setState');
    mount(<Input {...props} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('onBlur should calls validator with proper arguments', () => {
    const wrapper = shallow(<Input {...props} />);
    wrapper.find('input').simulate('blur', testEventArg);
    expect(validator).toBeCalledWith(testEventArg.target.value, props);
  });

  it('onBlur should change state.errorMessage to proper value if validator returns data', () => {
    const wrapper = shallow(<Input {...props} />);
    const instance = wrapper.instance();
    wrapper.find('input').simulate('blur', testEventArg);
    expect(instance.state.errorMessage).toBe(testEventArg.target.value);
  });

  it('onBlur should not calls setState if validator return null', () => {
    const spy = jest.spyOn(Input.prototype, 'setState');
    const wrapper = shallow(<Input {...props} />);
    wrapper.find('input').simulate('blur', { target: { value: null } });
    expect(spy).not.toHaveBeenCalled();
  });
});
