import { REQUEST_DATA, RECEIVE_DATA } from '../constant';

const fetchNewsData = (state = { isFetching: false }, action) => {
  switch (action.type) {
    case REQUEST_DATA:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.payload,
      });
    default:
      return state;
  }
};

export default fetchNewsData;
