import React from 'react';
import { shallow } from 'enzyme';
import Users from '../Users';


const props = {
  users: [
    {
      name: 'Ivan',
      surname: 'Ivanon',
      id: 1,
    },
  ],
};

describe('Test <Users>', () => {
  it('should render one UsersList', () => {
    const wrapper = shallow(<Users {...props} />);
    expect(wrapper.find('UsersList').length).toEqual(1);
  });

  it('should pass users to UsersList', () => {
    const wrapper = shallow(<Users {...props} />);
    expect(wrapper.find('UsersList').props().users).toEqual(props.users);
  });

  it('should render one link', () => {
    const wrapper = shallow(<Users {...props} />);
    expect(wrapper.find('Link').length).toBe(1);
  });

  it('sets prop "to" of Link to proper path', () => {
    const wrapper = shallow(<Users {...props} />);
    expect(wrapper.find('Link').first().props().to)
      .toEqual(expect.stringContaining('/new_user'));
  });
});
