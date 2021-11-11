import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiConfig } from '../../../types/api';
import { fetchNewConfigRef } from '../effects';
import { initialConfigState } from '../state';

type SetConfigType = { configRef?: ApiConfig['configRef'], id?: ApiConfig['id'] };

const configSlice = createSlice({
  name: 'config',
  initialState: initialConfigState(),
  reducers: {
    setConfig: (state: any, { payload: { configRef, id } }: PayloadAction<SetConfigType>): void => {
      state.configRef = configRef;
      state.id = id
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNewConfigRef.fulfilled, (state, action) => {
      if (action?.payload?.configRef && action?.payload?.id) {
        state.configRef = action.payload.configRef;
        state.id = action.payload.id;
      }
    }
    );
  }
})

export default configSlice
