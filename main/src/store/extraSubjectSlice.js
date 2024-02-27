import { createSlice } from '@reduxjs/toolkit';

const extraSubjectSlice = createSlice({
  name: 'extraSubjects',
  initialState: {
    value: 'extraSubjectTester',
    extraSubjects: [],
  },
  reducers: {
    setExtraSubjects: (state, action) => {
      state.extraSubjects = action.payload;
    },
  },
});

export const { setExtraSubjects } = extraSubjectSlice.actions;

export default extraSubjectSlice.reducer;
