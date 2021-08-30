import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllCandidatesAPI } from '../../../api/candidates'
import handleError from '../../../lib/error'
import logger from '../../../lib/log'
import { mapApiToCandidates } from '../lib/mapper'

export const fetchAllCandidates = createAsyncThunk(
  'candidates/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await fetchAllCandidatesAPI()
      if (Array.isArray(res?.data)) {
        return mapApiToCandidates(res.data)
      }

      logger({
        message: '[fetchAllCandidates] unexpected response format',
        context: { response: res }
      })
      throw new Error('Failed to parse server reponse')
    } catch (error) {
      handleError({
        error,
        context: {
          origin: 'fetchAllCandidates'
        }
      })
    }
  }
)
