import React from 'react';
import { shallow } from 'enzyme';
import TransactionsList from '../TransactionsList';

const props = {
  transactions: [
    {
      title: 'test1',
      cost: 1,
      payerId: 1,
      participantsId: [1, 2],
      id: 1,
    },
    {
      title: 'test2',
      cost: 2,
      payerId: 2,
      participantsId: [1, 3],
      id: 2,
    },
  ],
};


describe('Test <TransactionsList>', () => {
  it('should render one ul', () => {
    const wrapper = shallow(<TransactionsList {...props} />);
    expect(wrapper.find('ul').length).toBe(1);
  });

  it('should render two links', () => {
    const wrapper = shallow(<TransactionsList {...props} />);
    expect(wrapper.find('Link').length).toBe(2);
  });

  it('sets prop "to" of Link component to proper path', () => {
    const wrapper = shallow(<TransactionsList {...props} />);
    expect(wrapper.find('Link[to="/transactions/1"]').length).toBe(1);
  });

  it('should render two TransactionPreview', () => {
    const wrapper = shallow(<TransactionsList {...props} />);
    expect(wrapper.find('TransactionPreview').length).toBe(2);
  });

  it('sets ', () => {
    const wrapper = shallow(<TransactionsList {...props} />);
    expect(wrapper.find('TransactionPreview').length).toBe(2);
  });

  it("sets the rendered TransactionPreview's props to proper values", () => {
    const wrapper = shallow(<TransactionsList {...props} />);
    expect(wrapper.find('TransactionPreview[title="test1"]').length).toBe(1);
    expect(wrapper.find('TransactionPreview[title="test1"]').props().cost)
      .toBe(props.transactions[0].cost);
    expect(wrapper.find('TransactionPreview[title="test1"]').props().participantsId)
      .toEqual(props.transactions[0].participantsId);
  });
});
