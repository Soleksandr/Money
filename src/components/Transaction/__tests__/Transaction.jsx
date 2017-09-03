import React from 'react';
import { shallow } from 'enzyme';
import Transaction from '../Transaction';


const mockUser1 = {
  username: 'ivan',
  name: 'Ivan',
  surname: 'Ivanov',
  id: 1,
};

const mockUser2 = {
  username: 'petr',
  name: 'Petr',
  surname: 'Petrov',
  id: 2,
};

const mockProps = {
  users: [
    mockUser1,
    mockUser2,
  ],
  transactions: [
    {
      title: 'test1',
      cost: '1',
      payer: mockUser1,
      participants: [mockUser1, mockUser2],
      id: 1,
    },
    {
      title: 'test2',
      cost: '2',
      payer: mockUser2,
      participants: [mockUser1, mockUser2],
      id: 2,
    },
  ],
  match: {
    params: {
      id: null,
    },
  },
};

describe('Test <Transaction>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call renderTransaction method with propper parameter when transaction exist', () => {
    const wrapper = shallow(<Transaction {...mockProps} />);
    const instance = wrapper.instance();
    instance.renderTransaction = jest.fn();
    wrapper.setProps({
      match: {
        params: {
          id: mockProps.transactions[0].id,
        },
      },
    });
    expect(wrapper.instance().renderTransaction).toBeCalledWith(mockProps.transactions[0]);
  });

  it('should render not less than four input when transaction exist', () => {
    const wrapper = shallow(<Transaction {...mockProps} />);
    wrapper.setProps({
      match: {
        params: {
          id: mockProps.transactions[0].id,
        },
      },
    });
    expect(wrapper.find('input').length).toBeGreaterThan(3);
  });

  it('should not call renderTransaction method when transaction does not exist', () => {
    const wrapper = shallow(<Transaction {...mockProps} />);
    const instance = wrapper.instance();
    instance.renderTransaction = jest.fn();
    expect(wrapper.instance().renderTransaction).not.toBeCalled();
  });
});
