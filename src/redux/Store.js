import { applyMiddleware, legacy_createStore as createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import RootSaga from "./RootSaga";
import rootReducer from "./RootReducer";

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(RootSaga);

export default store;
