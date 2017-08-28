import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';

jest.mock('../../../style/style.scss', () => jest.fn());

const props = {
  getTransactions: jest.fn(),
  getUsers: jest.fn(),
  userInitialize: jest.fn(),
  isFetching: true,
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


  it('props.getUsers, props.getTransactions and userInitialize should be called', () => {
    mount(<App {...props} />);
    expect(props.getTransactions).toHaveBeenCalled();
    expect(props.getUsers).toHaveBeenCalled();
    expect(props.userInitialize).toHaveBeenCalled();
  });
});
