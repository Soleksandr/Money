import React from 'react';
import { shallow } from 'enzyme';
import SelectUser from '../SelectUser';

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
  onPayidByChange: jest.fn(),
  value: '1',
  errorMessage: null,
};

describe('Test <SelectUser>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    props.errorMessage = null;
  });

  it('should render one select', () => {
    const wrapper = shallow(<SelectUser {...props} />);
    expect(wrapper.find('select').length).toBe(1);
  });

  it('should render three options', () => {
    const wrapper = shallow(<SelectUser {...props} />);
    expect(wrapper.find('option').length).toBe(props.users.length + 1);
  });

  it('should render options with proper props', () => {
    const wrapper = shallow(<SelectUser {...props} />);
    expect(wrapper.find('option').last().props().value).toBe(props.users[1].id);
  });

  it('onPayidByChange should be called', () => {
    const wrapper = shallow(<SelectUser {...props} />);
    wrapper.find('select').simulate('change');
    expect(props.onPayidByChange).toBeCalled();
  });

  it('should not render ErrorMessage when props.errorMessage is not defined', () => {
    const wrapper = shallow(<SelectUser {...props} />);
    expect(wrapper.find('ErrorMessage').length).toBe(0);
  });

  it('should render ErrorMessage when props.errorMessage is defined', () => {
    props.errorMessage = 'error';
    const wrapper = shallow(<SelectUser {...props} />);
    expect(wrapper.find('ErrorMessage').length).toBe(1);
  });

  it('should render ErrorMessage with proper props', () => {
    props.errorMessage = 'error';
    const wrapper = shallow(<SelectUser {...props} />);
    expect(wrapper.find('ErrorMessage').props().message).toBe(props.errorMessage);
  });
});
