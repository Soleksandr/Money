import fetchMock from 'fetch-mock';
import * as apiCalls from '../transactions';

const mockTransactions = [
  {
    title: 'test',
    cost: 1,
    payerId: 1,
    participantsId: [1, 2],
    id: 1,
  },
  {
    title: 'test1',
    cost: 2,
    payerId: 2,
    participantsId: [1, 2],
    id: 1,
  },
];

const mockTransaction = {
  title: 'test3',
  cost: 3,
  payerId: 3,
  participantsId: [1, 2, 3],
  id: 1,
};

describe('Test transactions apiCalls', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('apiCalls.getTransactions should return proper data', () => {
    fetchMock.get('/backend/transactions', mockTransactions);
    apiCalls.getTransactions().then(data =>
      expect(data).toEqual(mockTransactions),
    );
  });

  it('apiCalls.createTransaction should return proper data ', () => {
    fetchMock.post('/backend/transactions', mockTransaction);
    apiCalls.createTransaction(mockTransaction).then(data =>
      expect(data).toEqual(mockTransaction),
    );
  });
});
