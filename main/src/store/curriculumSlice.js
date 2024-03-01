import { createSlice } from '@reduxjs/toolkit';

const curriculumSlice = createSlice({
  name: 'curriculums',
  initialState: {
    value: 'CurriculumTester',
    curriculums: [],
  },
  reducers: {
    setCurriculums: (state, action) => {
      state.curriculums = action.payload;
    },
  },
});

export const { setCurriculums } = curriculumSlice.actions;

export default curriculumSlice.reducer;
