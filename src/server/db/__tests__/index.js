const db = require('../index');

const testTransaction = {
  title: 'car',
  cost: 1000,
  payerId: 1,
  participantsId: [1, 2],
};

const testUser = {
  name: 'Vasil',
  surname: 'Vasilev',
};

describe('Test db.User', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return object with proper fields', () => {
    const instance = new db.User(testUser);
    expect(instance).toMatchObject(testUser);
  });

  it('should return objects with unique id', () => {
    const instance1 = new db.User(testUser);
    const instance2 = new db.User(testUser);
    expect(instance1.id !== instance2.id).toBeTruthy();
  });
});

describe('Test db.Transaction', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return object with proper fields', () => {
    const instance = new db.Transaction(testTransaction);
    expect(instance).toMatchObject(testTransaction);
  });

  it('should return objects with unique id', () => {
    const instance1 = new db.Transaction(testTransaction);
    const instance2 = new db.Transaction(testTransaction);
    expect(instance1.id !== instance2.id).toBeTruthy();
  });
});
