import React from 'react';
import { shallow } from 'enzyme';
import UsersList from '../UsersList';

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
  onMarkCheckbox: jest.fn(),
  isSelectOpportunity: null,
};


describe('Test <UsersList>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render one ul', () => {
    const wrapper = shallow(<UsersList {...props} />);
    expect(wrapper.find('ul').length).toBe(1);
  });

  it('should call renderUserPreview two times with proper arguments when isSelectionOpp is false', () => {
    const wrapper = shallow(<UsersList {...props} />);
    wrapper.instance().renderUserPreview = jest.fn();
    wrapper.setProps({ isSelectOpportunity: false });
    expect(wrapper.instance().renderUserPreview).toBeCalledWith(props.users[1]);
    expect(wrapper.instance().renderUserPreview).toHaveBeenCalledTimes(props.users.length);
  });

  it('should render UserPreview with proper props when isSelectionOpp is false', () => {
    const wrapper = shallow(<UsersList {...props} />);
    expect(wrapper.find('UserPreview').first().props().id).toBe(props.users[0].id);
    expect(wrapper.find('UserPreview').first().props().name).toBe(props.users[0].name);
    expect(wrapper.find('UserPreview').first().props().surname).toBe(props.users[0].surname);
  });

  it('should not call renderUserSelectionOpp when isSelectionOpp is false', () => {
    const wrapper = shallow(<UsersList {...props} />);
    wrapper.instance().renderUserSelectionOpp = jest.fn();
    wrapper.setProps({ isSelectOpportunity: false });
    expect(wrapper.instance().renderUserSelectionOpp).not.toBeCalled();
  });

  it('should render two Links with proper props when isSelectionOpp is false', () => {
    const wrapper = shallow(<UsersList {...props} />);
    wrapper.setProps({ isSelectOpportunity: false });
    expect(wrapper.find('Link').length).toBe(2);
    expect(wrapper.find('Link').first().props().to)
      .toEqual(expect.stringContaining(`${props.users[0].id}`));
  });

  it('should call renderUserSelectionOpp two times with proper arguments when isSelectionOpp is true', () => {
    const wrapper = shallow(<UsersList {...props} />);
    wrapper.instance().renderUserSelectionOpp = jest.fn();
    wrapper.setProps({ isSelectOpportunity: true });
    expect(wrapper.instance().renderUserSelectionOpp).toBeCalledWith(props.users[1]);
    expect(wrapper.instance().renderUserSelectionOpp).toHaveBeenCalledTimes(props.users.length);
  });

  it('should render UserPreview with proper props when isSelectionOpp is true', () => {
    const wrapper = shallow(<UsersList {...props} />);
    expect(wrapper.find('UserPreview').first().props().id).toBe(props.users[0].id);
    expect(wrapper.find('UserPreview').first().props().name).toBe(props.users[0].name);
    expect(wrapper.find('UserPreview').first().props().surname).toBe(props.users[0].surname);
  });

  it('should not call renderUserPreview when isSelectionOpp is true', () => {
    const wrapper = shallow(<UsersList {...props} />);
    wrapper.instance().renderUserPreview = jest.fn();
    wrapper.setProps({ isSelectOpportunity: true });
    expect(wrapper.instance().renderUserPreview).not.toBeCalled();
  });

  it('should not render two Links when isSelectionOpp is true', () => {
    const wrapper = shallow(<UsersList {...props} />);
    wrapper.setProps({ isSelectOpportunity: true });
    expect(wrapper.find('Link').length).toBe(0);
  });
});
