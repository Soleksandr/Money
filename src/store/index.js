import { CreateStore } from 'redux';
import reducers from '../reducers';

const store = CreateStore({
  reducers,
});

export default store;
