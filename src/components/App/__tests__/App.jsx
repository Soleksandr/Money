import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';

jest.mock('../../../style/style.scss', () => jest.fn());

const props = {
  getTransactions: jest.fn(),
  getUsers: jest.fn(),
  userInitialize: jest.fn(),
  isFetching: true,
  logout: jest.fn(),
  user: {
    username: 'test',
    name: 'test',
    surname: 'test',
    id: 1,
  },
};

describe('Test <App>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should calls componentDidMount', () => {
    const spy = jest.spyOn(App.prototype, 'componentDidMount');
    mount(<App {...props} />);
    expect(spy).toHaveBeenCalled();
  });

  it('props.getUsers, props.getTransactions and userInitialize should be called', () => {
    mount(<App {...props} />);
    expect(props.getTransactions).toHaveBeenCalled();
    expect(props.getUsers).toHaveBeenCalled();
    expect(props.userInitialize).toHaveBeenCalled();
  });

  it('should render <div>Loading...</div>, when fetching data is true', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.equals(<div>Loading...</div>)).toBe(true);
  });

  it('should render App, when fetching data is true', () => {
    props.isFetching = false;
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.name()).toBe('BrowserRouter');
  });


  it('should render Layout component with proper props', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find('Layout').props().logout).toEqual(props.logout);
    expect(wrapper.find('Layout').props().user).toEqual(props.user);
  });
});
