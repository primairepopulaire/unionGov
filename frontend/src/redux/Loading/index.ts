import { createSlice } from '@reduxjs/toolkit'
import { initialLoadingStatusState, LoadingStatusItem, LoadingStatusItems, LoadingStatusKey, LoadingStatusState } from './state'

type LoadingStatusReducerHelperProps = {
  /** state LoadingStatus state */
  state: LoadingStatusState;
  /** The state's key to modify the state of */
  key: LoadingStatusKey;
  /** The state key id to modify the state of */
  id?: string;
  /** the next loading value you want to see emitted */
  isLoading: boolean;
  /** the next error value you want to see emitted */
  error?: string;
};

const reduceItem = ({
  isLoading,
  error
}: LoadingStatusItem): LoadingStatusItem => ({
  isLoading,
  error
})
/**
 * Fully DRY purposed function
 * All the loadingStatusReducer does is changing isLoading & error properties of an object or a subobject
 */
const loadingStatusReducerHelper = ({
  state,
  key,
  id,
  isLoading,
  error
}: LoadingStatusReducerHelperProps): LoadingStatusState => {
  // We can have multiple loading ids beneath a single key
  if (id) {
    const nextSpecificState =
      (state[key] as LoadingStatusItems) || ({} as LoadingStatusItems)
    return {
      ...state,
      [key]: {
        ...nextSpecificState,
        [id]: reduceItem({ isLoading, error })
      }
    }
  }

  return {
    ...state,
    [key]: {
      ...state[key],
      ...reduceItem({ isLoading, error })
    }
  }
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialLoadingStatusState(),
  reducers: {
    loadingStart: (state, action) =>
      loadingStatusReducerHelper({
        state,
        error: undefined,
        isLoading: true,
        ...action.payload
      }),
    loadingEnd: (state, action) =>
      loadingStatusReducerHelper({
        state,
        error: undefined,
        isLoading: false,
        ...action.payload
      }),
    loadingError: (state, action) =>
      loadingStatusReducerHelper({
        state,
        isLoading: false,
        ...action.payload
      })
  }
})

export default loadingSlice
