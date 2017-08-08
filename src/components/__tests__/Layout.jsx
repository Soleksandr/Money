import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../Layout';

describe('Test <Layout>', () => {
  it('should render three Links', () => {
    const wrapper = shallow(<Layout />);
    expect(wrapper.find('Link').length).toBe(3);
  });

  it('should render children elements', () => {
    const wrapper = shallow(<Layout><div className="test">test</div></Layout>);
    expect(wrapper.find('.test').length).toBe(1);
  });
});
