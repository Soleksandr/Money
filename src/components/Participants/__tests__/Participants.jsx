import React from 'react';
import { shallow, mount } from 'enzyme';
import Participants from '../Participants';

const mockParticipant1 = {
  username: 'ivan',
  name: 'Ivan',
  surname: 'Ivanov',
  id: 1,
  money: '-10'
};

const mockParticipant2 = {
  username: 'petr',
  name: 'Petr',
  surname: 'Petrov',
  id: 2,
  money: '10'
};

const mockProps = {
  participants: [
    mockParticipant1,
    mockParticipant2,
  ],
  getParticipants: jest.fn(),
};

describe('Test <Participants>', () => {
  it('should render one UsersList', () => {
    const wrapper = shallow(<Participants {...mockProps} />);
    expect(wrapper.find('UsersList').length).toEqual(1);
  });

  it('should render UsersList with proper props', () => {
    const wrapper = shallow(<Participants {...mockProps} />);
    expect(wrapper.find('UsersList').props().users).toEqual(mockProps.participants);
  });

  it('should render one link', () => {
    const wrapper = shallow(<Participants {...mockProps} />);
    expect(wrapper.find('Link').length).toBe(1);
  });

  it('sets prop "to" of Link to proper path', () => {
    const wrapper = shallow(<Participants {...mockProps} />);
    expect(wrapper.find('Link').props().to)
      .toEqual(expect.stringContaining('/registration'));
  });
});
