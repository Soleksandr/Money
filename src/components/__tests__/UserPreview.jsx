import React from 'react';
import { shallow } from 'enzyme';
import UserPreview from '../UserPreview';

const props = {
  name: 'Ivan',
  surname: 'Ivanov',
  id: 1,
};


describe('Test <UserPreview>', () => {
  it('should render one li', () => {
    const wrapper = shallow(<UserPreview {...props} />);
    expect(wrapper.find('li').length).toBe(1);
  });
});
