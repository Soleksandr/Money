import React from 'react';
import { connect } from 'react-redux';
import c from '../connect';

jest.mock('react-redux', () => ({
  connect: jest.fn(),
}));

const mockMapStateToProps = 'test1';
const mockMapDispatchToProps = 'test2';

describe('Test connect for <AddTransactionForm>', () => {
  it('should to be called with mockMapStateToProps and mockMapDispatchToProps',
    expect(wrapper.find('input').length).toBe(2);
  });

});
