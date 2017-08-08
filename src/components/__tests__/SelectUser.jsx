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
  payerId: '1',
};

describe('Test <SelectUser>', () => {
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
});
