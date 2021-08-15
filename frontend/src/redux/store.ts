import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { middlewares, sagaMiddleware } from "./middlewares";
import { rootReducer } from "./reducers";
import { rootSaga } from "./sagas";
import log from '../lib/log'

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

let sagaRunner: ReturnType<typeof sagaMiddleware.run> | undefined;

const initSagas = (_rootSaga: typeof rootSaga) => {
  // To avoid duplicate running sagas when using fast reload
  // https://github.com/redux-saga/redux-saga/issues/1961
  if (process.env.NODE_ENV === "development" && module.hot && !!sagaRunner) {
    log({
      message: "[saga] prevented duplicate init",
    });
    sagaRunner.cancel();
  }

  sagaRunner = sagaMiddleware.run(_rootSaga);
};

initSagas(rootSaga);
