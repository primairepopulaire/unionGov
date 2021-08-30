import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchRichConfigAPI } from '../../../api/rich-configs'
import handleError from '../../../lib/error'
import logger from '../../../lib/log'
import { mapApiGovernementToStateGov } from '../lib/mapper'

export const fetchGovernmentById = createAsyncThunk(
  'government/fetchById',
  async (id: number, thunkAPI) => {
    try {
      const res = await fetchRichConfigAPI(id)
      if (Array.isArray(res?.data)) {
        return mapApiGovernementToStateGov(res.data);
      }

      logger({
        message: '[fetchGovernmentById] unexpected response format',
        context: { response: res }
      })
      throw new Error('Failed to parse server reponse')
    } catch (error) {
      handleError({
        error,
        context: {
          origin: 'fetchGovernmentById'
        }
      })
    }
  }
)
