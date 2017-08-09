import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

const props = {
  getTransactions: jest.fn(),
  getUsers: jest.fn(),
};

describe('Test <App>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should calls componentDidMount', () => {
    const spy = jest.spyOn(App.prototype, 'componentDidMount');
    const wrapper = mount(<App {...props} />);
    expect(spy).toHaveBeenCalled();
  });

  it('props.getUsers and props.getTransactions should be called', () => {
    const wrapper = mount(<App {...props} />);
    expect(props.getTransactions).toHaveBeenCalled();
    expect(props.getUsers).toHaveBeenCalled();
  });

  it('props.getUsers and props.getTransactions should be called', () => {
    const wrapper = mount(<App {...props} />);
    expect(props.getTransactions).toHaveBeenCalled();
    expect(props.getUsers).toHaveBeenCalled();
  });
});
