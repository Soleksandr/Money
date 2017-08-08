import React from 'react';
import { shallow } from 'enzyme';
import UserSelectionOpp from '../UserSelectionOpp';

const props = {
  name: 'Ivan',
  surname: 'Ivanov',
  id: 1,
  onMarkCheckbox: jest.fn(),
};


describe('Test <UserSelectionOpp>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render one li', () => {
    const wrapper = shallow(<UserSelectionOpp {...props} />);
    expect(wrapper.find('li').length).toBe(1);
  });

  it('should render one input', () => {
    const wrapper = shallow(<UserSelectionOpp {...props} />);
    expect(wrapper.find('input').length).toBe(1);
  });

  it('should has isChecked prop of state equal to false', () => {
    const wrapper = shallow(<UserSelectionOpp {...props} />);
    const instance = wrapper.instance();
    expect(instance.state.isChecked).toBe(false);
  });

  it('should sets checked prop of input equal to state.isChecked value', () => {
    const wrapper = shallow(<UserSelectionOpp {...props} />);
    const isChecked = wrapper.instance().state.isChecked;
    expect(wrapper.find('input').props().checked).toBe(isChecked);
  });

  it('state.isChecked should change value to opposite', () => {
    const wrapper = shallow(<UserSelectionOpp {...props} />);
    const current = wrapper.instance().state.isChecked;
    wrapper.find('input').simulate('change');
    expect(wrapper.instance().state.isChecked).toBe(!current);
  });

  it('onMarkCheckbox should be called with proper argument when state.isChecked equal to true', () => {
    const wrapper = shallow(<UserSelectionOpp {...props} />);
    wrapper.find('input').simulate('change');
    expect(props.onMarkCheckbox).toBeCalledWith(props.id, wrapper.instance().state.isChecked);
  });
});
