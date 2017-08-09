import React from 'react';
import { shallow } from 'enzyme';
import Transactions from '../Transactions';


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
      payerId: 3,
      participantsId: [3, 4],
      id: 2,
    },
  ],
  match: {
    params: {
      id: null,
    },
  },
};

const setId = (value) => {
  props.match.params.id = value;
};

describe('Test <Transactions>', () => {
  it('should render one transaction', () => {
    const wrapper = shallow(<Transactions {...props} />);
    expect(wrapper.find('TransactionsList').length).toEqual(1);
  });

  it('should pass all transactions when match.params.id is null', () => {
    const wrapper = shallow(<Transactions {...props} />);
    expect(wrapper.find('TransactionsList').props().transactions).toEqual(props.transactions);
  });

  it('should pass selected transactions when match.params.id proper is proper value', () => {
    setId(1);
    const wrapper = shallow(<Transactions {...props} />);
    expect(wrapper.find('TransactionsList').props().transactions).toEqual([props.transactions[0]]);
  });

  it('should render one link', () => {
    const wrapper = shallow(<Transactions {...props} />);
    expect(wrapper.find('Link').length).toBe(1);
  });

  it('sets prop "to" of Link to proper path', () => {
    const wrapper = shallow(<Transactions {...props} />);
    expect(wrapper.find('Link').first().props().to)
      .toEqual(expect.stringContaining('/new_transaction'));
  });
});
