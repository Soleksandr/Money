import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../Layout';

const user = {
  username: 'ivanov',
  name: 'Ivan',
  surname: 'Ivanov',
  id: 1,
};

const props = {
  user,
  children: <div className="testChildren">test</div>,
  logout: jest.fn(),
};

describe('Test <Layout>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    props.user = user;
  });

  it('should render three Links when props.user is identify', () => {
    const wrapper = shallow(<Layout {...props} />);
    expect(wrapper.find('Link').length).toBe(3);
  });

  it('should render two Links when props.user is identify', () => {
    props.user = null;
    const wrapper = shallow(<Layout {...props} />);
    expect(wrapper.find('Link').length).toBe(2);
  });

  it('should render children elements', () => {
    const wrapper = shallow(<Layout {...props} />);
    expect(wrapper.find('.testChildren').length).toBe(1);
  });

  it('click to link with "/" rout should calls props.logout', () => {
    const wrapper = shallow(<Layout {...props} />);
    wrapper.find('Link[to="/"]').simulate('click');
    expect(props.logout).toBeCalled();
  });
});
