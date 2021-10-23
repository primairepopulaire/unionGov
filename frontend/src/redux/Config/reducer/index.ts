import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiConfig } from '../../../types/api';
import { fetchNewConfigRef } from '../effects';
import { initialConfigState } from '../state';

type SetConfig = { configRef?: ApiConfig['configRef'] };

const configSlice = createSlice({
  name: 'config',
  initialState: initialConfigState(),
  reducers: {
    setConfigRef: (state: any, { payload: { configRef } }: PayloadAction<SetConfig>): void => {
      state.configRef = configRef;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNewConfigRef.fulfilled, (state, action) => {
      if (action?.payload?.configRef) {
        state.configRef = action.payload.configRef;
      }
    }
    );
  }
})

export const { setConfigRef: setConfigAction } = configSlice.actions;

export default configSlice
