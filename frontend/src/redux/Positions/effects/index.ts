import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllPositionsAPI } from '../../../api/positions'
import handleError from '../../../lib/error'
import logger from '../../../lib/log'
import { mapApiToPositions } from '../lib/mapper'

export const fetchAllPositions = createAsyncThunk(
  'positions/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await fetchAllPositionsAPI()
      if (Array.isArray(res?.data)) {
        return mapApiToPositions(res.data)
      }

      logger({
        message: '[fetchAllPositions] unexpected response format',
        context: { response: res }
      })
      throw new Error('Failed to parse server reponse')
    } catch (error) {
      handleError({
        error: error as Error,
        context: {
          origin: 'fetchAllPositions'
        }
      })
    }
  }
)
