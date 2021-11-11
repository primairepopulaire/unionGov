import { createAsyncThunk } from '@reduxjs/toolkit'
import { setGovernmentAPI } from '../../../api/government'
import { fetchRichConfigAPI } from '../../../api/rich-configs'
import handleError from '../../../lib/error'
import logger from '../../../lib/log'
import { ApiNewGovernment } from '../../../types/api'
import { ConfigState } from '../../Config/state'
import { mapApiGovernementToStateGov } from '../lib/mapper'
import { GovernmentState } from '../state'

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
        error: error as Error,
        context: {
          origin: 'fetchGovernmentById'
        }
      })
    }
  }
)

export const setGovernmentById: any = createAsyncThunk(
  'government/setById/',
  async (payload: { config: ConfigState, governement: GovernmentState }, thunkAPI) => {
    try {
      const { config, governement } = payload
      const newGovernement: ApiNewGovernment = []
      const { id } = config
      if (id) {
        Object.entries(governement).forEach(([position, candidate]) => {
          newGovernement.push({ config_ref: id, position: Number(position), candidate: Number(candidate) })
        })
        const res = await setGovernmentAPI(newGovernement)
        logger({
          message: '[setGovernmentById] unexpected response format',
          context: { response: res }
        })
        throw new Error('Failed to parse server reponse')
      }
    } catch (error) {
      handleError({
        error: error as Error,
        context: {
          origin: 'setGovernmentById'
        }
      })
    }
  }
)
