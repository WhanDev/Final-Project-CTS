import { configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';
import userSlice from './userSlice';
import testTransfer from './testTransfer';

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    user: userSlice,
    tester:testTransfer
  },
});

export default store;
