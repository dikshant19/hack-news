import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

let initialState = {
  isFetching: false,
};

export default function configureStore() {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware)
  );
}
