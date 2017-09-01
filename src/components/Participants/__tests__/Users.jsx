import React from 'react';
import { shallow } from 'enzyme';
import Users from '../Users';


const props = {
  users: [
    {
      username: 'ivan',
      name: 'Ivan',
      surname: 'Ivanon',
      id: 1,
    },
    {
      username: 'petr',
      name: 'Petr',
      surname: 'Petrov',
      id: 2,
    },
  ],
  transactions: [
    {
      id: 1,
      title: 'test1',
      cost: '50',
      payerId: 1,
      participantsId: [1, 2],
    },
    {
      id: 2,
      title: 'test2',
      cost: '110',
      payerId: 2,
      participantsId: [1, 2],
    },
  ],
  user:
  {
    username: 'ivan',
    name: 'Ivan',
    surname: 'Ivanov',
    id: 1,
  },
};

describe('Test <Users>', () => {
  it('should render one UsersList', () => {
    const wrapper = shallow(<Users {...props} />);
    expect(wrapper.find('UsersList').length).toEqual(1);
  });

  it('should pass proper participants only to UsersList', () => {
    const wrapper = shallow(<Users {...props} />);
    expect(wrapper.find('UsersList').props().users).not.toContain(props.users);
  });

  it('should add money property to participants with correct value', () => {
    const wrapper = shallow(<Users {...props} />);
    expect(wrapper.find('UsersList').props().users[0].money).toBeDefined();
    expect(wrapper.find('UsersList').props().users[0].money).toEqual(((50 / 2) - (110 / 2)).toFixed(2));
  });

  it('should render one link', () => {
    const wrapper = shallow(<Users {...props} />);
    expect(wrapper.find('Link').length).toBe(1);
  });

  it('sets prop "to" of Link to proper path', () => {
    const wrapper = shallow(<Users {...props} />);
    expect(wrapper.find('Link').first().props().to)
      .toEqual(expect.stringContaining('/registration'));
  });
});
