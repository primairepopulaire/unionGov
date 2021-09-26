import { createAsyncThunk, PayloadAction, ThunkDispatch } from '@reduxjs/toolkit';
import { bookConfigAPI, fetchRichConfigAPI, saveCouplesAPI, SaveCouplesParams } from '../../../api/rich-configs';
import handleError from '../../../lib/error';
import logger from '../../../lib/log';
import { Position } from '../../Positions/state';
import { RootState } from '../../store';
import { mapApiGovernementToStateGov } from '../lib/mapper';
import { errorSavingAction, loadingSavingAction, setShareRefAction, successSavingAction } from '../reducer';
import { governmentSelector, isSavingGovernmentSelector } from '../selectors';
import { CoupleConfig, GovernmentState } from '../state';

export const fetchGovernmentById = createAsyncThunk(
  'government/fetchById',
  async (id: number, thunk) => {
    try {
      const res = await fetchRichConfigAPI(id);
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

/** Wraps the api call response managing a share-slot id creation */
const bookReference = async (dispatch: ThunkDispatch<{}, {}, PayloadAction>, getState: () => RootState): Promise<NonNullable<GovernmentState['shareRef']> | false> => {
  const { data, status, statusText } = await bookConfigAPI();

  if (!data?.id || typeof data?.id === typeof '') {
    logger({
      message:
        '[bookReference] Failed to parse booking server response while sharing government',
      context: {
        status,
        statusText,
        data
      },
      type: 'debug'
    });
    return false;
  }

  return data.id;
}

export const shareGovernment = createAsyncThunk(
  'government/share',
  async (_, { dispatch, getState }) => {
    /** Prevent annoyed useless clicks */
    if (isSavingGovernmentSelector(getState() as RootState)) {
      return
    }

    dispatch(loadingSavingAction());

    try {
      const shareRef = await bookReference(dispatch, getState as () => RootState);

      console.log('shareRef', shareRef);

      if (!shareRef) {
        throw new Error(
          '[shareGovernment] Failed to create a share government share ID'
        );
      }

      const couples: ReturnType<typeof governmentSelector> | undefined =
        governmentSelector(getState() as RootState);

      if (!couples) {
        throw new Error('[shareGovernment] Failed to retreive couples in state');
      }

      const response = await saveCouplesAPI(
        (
          Object.entries(couples).filter(([, conf]) => !!conf?.candidateId) as [
            Position['id'],
            CoupleConfig
          ][]
        ).map(([positionId, { candidateId }]): SaveCouplesParams[0] => ({
          position: positionId,
          candidate: candidateId,
          configRef: shareRef
        }))
      );

      console.log('coucou unnused response (for now ?)', response);

      dispatch(setShareRefAction(shareRef));
      dispatch(successSavingAction());
    } catch (error) {
      const typedError = error as Error;
      dispatch(
        errorSavingAction(
          typeof typedError?.message === typeof '' ? typedError.message : 'Unknown error'
        )
      );
      handleError({
        error: typedError,
        context: {
          origin: 'shareGovernment'
        }
      });
    }
  }
);
