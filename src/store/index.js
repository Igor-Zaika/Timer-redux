
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

import reducer from '../reducers/index';
import rootSaga from '../saga/countSaga'

const sagaMiddleware = createSagaMiddleware();


const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

sagaMiddleware.run(rootSaga)

export default store;

