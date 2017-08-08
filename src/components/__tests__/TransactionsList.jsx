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
    expect(wrapper.find('Link').length).toBe(props.transactions.length);
  });

  it('sets prop "to" of Link to proper path', () => {
    const wrapper = shallow(<TransactionsList {...props} />);
    expect(wrapper.find('Link').first().props().to)
      .toEqual(expect.stringContaining(`${props.transactions[0].id}`));
  });

  it('should render two TransactionPreview', () => {
    const wrapper = shallow(<TransactionsList {...props} />);
    expect(wrapper.find('TransactionPreview').length).toBe(props.transactions.length);
  });

  it("sets the rendered TransactionPreview's props to proper values", () => {
    const wrapper = shallow(<TransactionsList {...props} />);
    expect(wrapper.find('TransactionPreview').first().props().title)
      .toBe(props.transactions[0].title);
    expect(wrapper.find('TransactionPreview').first().props().cost)
      .toBe(props.transactions[0].cost);
    expect(wrapper.find('TransactionPreview').first().props().participantsId)
      .toEqual(props.transactions[0].participantsId);
  });
});
