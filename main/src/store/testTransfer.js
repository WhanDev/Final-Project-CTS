import { createSlice } from '@reduxjs/toolkit';

const testTransferSlice = createSlice({
  name: 'tester',
  initialState: {
    value: 'testTransfer',
    data: [],
    testResultTransfer: { success: [] }, // Add testResultTransfer and its success field
  },
  reducers: {
    updateSuccess: (state, action) => {
      state.testResultTransfer.success = action.payload; // Update the success field correctly
    },
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

export const { setTestTransfer, setTestResultTransfer, clearTestTransfer, updateSuccess } =
  testTransferSlice.actions;

export default testTransferSlice.reducer;
