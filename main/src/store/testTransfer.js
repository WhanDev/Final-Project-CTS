import { createSlice } from '@reduxjs/toolkit';

const testTransferSlice = createSlice({
  name: 'tester',
  initialState: {
    value: 'testTransfer',
    data: [],
  },
  reducers: {
    setTestTransfer: (state, action) => {
      state.testTransfer = action.payload;
    },
    setTestResultTransfer: (state, action) => {
      state.testResultTransfer = action.payload;
    },
    clearTestTransfer: (state) => {
      state.testTransfer = [];
    },
  },
});

export const { setTestTransfer,setTestResultTransfer,clearTestTransfer } = testTransferSlice.actions;

export default testTransferSlice.reducer;
