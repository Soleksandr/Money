import React from 'react';
import { shallow } from 'enzyme';
import TransactionPreview from '../TransactionPreview';

const props = {
  title: 'test',
  cost: 1,
  participantsId: [1, 2, 3],
};

describe('Test <TransactionPreview>', () => {
  it('should render one li', () => {
    const wrapper = shallow(<TransactionPreview {...props} />);
    expect(wrapper.find('li').length).toBe(1);
  });
});
