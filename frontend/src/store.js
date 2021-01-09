import storage from 'redux-persist/lib/storage'
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import {persistReducer, persistStore} from "redux-persist";
import RootReducer from "./reducers";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {logger} from 'redux-logger'

const persistConfig = {
    key: "userReducer",
    storage,
    stateReconciler: hardSet
}

const persistedReducer = persistReducer(persistConfig, RootReducer)

export default() => {
    let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(logger)))
    let persistor = persistStore(store)
    return {store, persistor}
}