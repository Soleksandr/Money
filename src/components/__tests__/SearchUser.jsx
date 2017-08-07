import React from 'react';
import { shallow } from 'enzyme';
import SearchUser from '../SearchUser';

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
};

describe('Test <SerchUser>', () => {
  it('should render one select', () => {
    const wrapper = shallow(<SearchUser {...props} />);
    expect(wrapper.find('select').length).toBe(1);
  });

  it('should render three options inside select', () => {
    const wrapper = shallow(<SearchUser {...props} />);
    expect(wrapper.find('option').length).toBe(3);
  });

  it('should render options with proper props', () => {
    const wrapper = shallow(<SearchUser {...props} />);
    expect(wrapper.find('option[value=1]').props().value).toBe(props.users[0].id);
  });

  it('should render options with proper text content', () => {
    const wrapper = shallow(<SearchUser {...props} />);
    expect(wrapper.find('option[value=1]').text())
      .toBe(`${props.users[0].name} ${props.users[0].surname}`);
  });

  it('onPayidByChange should to be called as select change handler', () => {
    const wrapper = shallow(<SearchUser {...props} />);
    wrapper.find('select').simulate('change');
    expect(props.onPayidByChange).toBeCalled();
  });
});
