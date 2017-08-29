import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from '../ErrorMessage';

const mockProps = {
  message: 'some error message',
};

describe('Test <ErrorMessage>', () => {
  it('should render message prop it gets', () => {
    const wrapper = shallow(<ErrorMessage {...mockProps} />);
    expect(wrapper.text()).toBe(mockProps.message);
  });
});
