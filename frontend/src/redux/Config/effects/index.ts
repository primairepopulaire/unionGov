import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchNewConfigRefApi } from '../../../api/configRef'
import handleError from '../../../lib/error'
import logger from '../../../lib/log'
export const fetchNewConfigRef = createAsyncThunk(
  'config/fetchNewId',
  async (thunkAPI) => {
    try {
      const res = await fetchNewConfigRefApi();
      if (res?.data) {
        return { configRef: res.data.config_ref, id: res.data.id };
      }

      logger({
        message: '[fetchNewConfigRef] unexpected response format',
        context: { response: res }
      })
      throw new Error('Failed to parse server reponse')
    } catch (error) {
      handleError({
        error: error as Error,
        context: {
          origin: 'fetchNewConfigRef'
        }
      })
    }
  }
)
