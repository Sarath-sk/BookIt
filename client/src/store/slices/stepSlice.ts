import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface StepState {
  currentStep: number;
}

const initialState: StepState = {
  currentStep: 1,
};

const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    resetStep: (state) => {
      state.currentStep = 1;
    },
  },
});

export const { setStep, nextStep, prevStep, resetStep } = stepSlice.actions;
export default stepSlice.reducer;
