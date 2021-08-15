import { Action, combineReducers } from "redux";

const appReducer = combineReducers({
});

export type RootState = {
};

type RootReducer = ReturnType<typeof appReducer>;

export const initialRootState = (): RootState => ({
});

export const rootReducer = (
  state: RootState | undefined,
  action: Action
): RootReducer => appReducer(state, action);

